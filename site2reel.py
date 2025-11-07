import requests
from bs4 import BeautifulSoup
from moviepy.editor import *
import textwrap
import io
from urllib.parse import urljoin
from moviepy.config import change_settings

change_settings({"IMAGEMAGICK_BINARY": "magick"})

def scrape_site_info(url: str):
    """Scrape basic metadata (title, description, and first image) from a website safely."""
    headers = {
        "User-Agent": (
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
            "AppleWebKit/537.36 (KHTML, like Gecko) "
            "Chrome/120.0.0.0 Safari/537.36"
        )
    }

    """Scrape basic metadata (title, description, and first image) from a website safely."""
    try:
        # Try fetching the webpage with a browser-like header
        response = requests.get(url, headers=headers, timeout=10)
        response.raise_for_status()
    except requests.exceptions.MissingSchema:
        print(f"❌ Invalid URL format: {url}")
        return {"title": "Invalid URL", "desc": "Please provide a valid website URL.", "img": None}
    except requests.exceptions.ConnectionError:
        print(f"❌ Could not connect to {url}")
        return {"title": "Connection Failed", "desc": "Unable to reach the website.", "img": None}
    except requests.exceptions.Timeout:
        print(f"⏳ Request timed out for {url}")
        return {"title": "Request Timeout", "desc": "The website took too long to respond.", "img": None}
    except requests.exceptions.RequestException as e:
        print(f"⚠️ Request error: {e}")
        return {"title": "Error", "desc": str(e), "img": None}

    # Parse HTML safely
    try:
        soup = BeautifulSoup(response.text, "html.parser")

        title = soup.title.string.strip() if soup.title and soup.title.string else "Discover Something Amazing"
        
        desc_tag = soup.find("meta", attrs={"name": "description"})
        desc = desc_tag["content"].strip() if desc_tag and desc_tag.get("content") else "Explore the website for more!"
        
        img_tag = soup.find("img")
        img_url = img_tag["src"] if img_tag and img_tag.get("src") else None

        # Resolve relative image URLs (e.g., "/images/logo.png")
        if img_url:
            img_url = urljoin(url, img_url)

        return {"title": title, "desc": desc, "img": img_url}

    except Exception as e:
        print(f"⚠️ Parsing error for {url}: {e}")
        return {"title": "Error parsing site", "desc": str(e), "img": None}

def download_image(url):
    """Download image and return a MoviePy ImageClip"""
    res = requests.get(url)
    image = io.BytesIO(res.content)
    clip = ImageClip(image).set_duration(5)
    return clip

def create_promo_video(site_info):
    """Create a short promo reel using title, desc, and optional image"""
    clips = []

    # Text clips
    text1 = TextClip(site_info["title"], fontsize=60, color='white', bg_color='black', size=(1280,720))
    text1 = text1.set_duration(3)

    text2 = TextClip(
        "\n".join(textwrap.wrap(site_info["desc"], 40)), 
        fontsize=40, color='white', bg_color='black', size=(1280,720)
    ).set_duration(4)

    clips.extend([text1, text2])

    # Image clip if available
    if site_info["img"]:
        try:
            img_clip = download_image(site_info["img"])
            clips.append(img_clip)
        except Exception:
            pass

    # Combine clips and add music
    final = concatenate_videoclips(clips, method="compose")

    try:
        music = AudioFileClip("background.mp3").volumex(0.3)
        final = final.set_audio(music)
    except Exception:
        pass

    final.write_videofile("promo.mp4", fps=24)

if __name__ == "__main__":
    url = input("Enter a website URL: ")
    site_info = scrape_site_info(url)
    print("Generating video for:", site_info["title"])
    create_promo_video(site_info)
    print("✅ Promotional reel saved as promo.mp4")
