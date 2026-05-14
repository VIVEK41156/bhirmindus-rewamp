try:
    from PIL import Image
    img = Image.open("src/assets/logo.avif")
    img.save("src/assets/logo_preview.png")
    print(f"Success: {img.size} {img.mode}")
except ImportError:
    print("PIL not installed")
except Exception as e:
    print(f"Error: {e}")
