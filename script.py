import os
import urllib.request
import zipfile
from pathlib import Path

# Mapping of file names to reliable high-quality PNG logo sources
LOGO_URLS = {
    # Robotics & Autonomy
    "ros2.png": "https://raw.githubusercontent.com/ros2/ros2_documentation/rolling/source/images/ros2-logo.png",
    "nav2.png": "https://raw.githubusercontent.com/ros-navigation/navigation2/main/docs/images/nav2_logo.png",
    "moveit2.png": "https://moveit.picknik.ai/main/_static/moveit_logo.png",
    "gazebo.png": "https://cdn.simpleicons.org/gazebo/181818",
    "slam-toolbox.png": "https://raw.githubusercontent.com/SteveMacenski/slam_toolbox/ros2/docs/icon.png",
    "amcl.png": "https://cdn.simpleicons.org/ros/22314E",
    "tf2.png": "https://cdn.simpleicons.org/ros/22314E",
    "ompl.png": "https://ompl.kavrakilab.org/ompl-logo.png",
    "pybullet.png": "https://pybullet.org/wordpress/wp-content/uploads/2017/02/bullet_logo_large.png",

    # Languages & Systems
    "cpp.png": "https://cdn.simpleicons.org/cplusplus/00599C",
    "python.png": "https://cdn.simpleicons.org/python/3776AB",
    "bash.png": "https://cdn.simpleicons.org/gnubash/4EAA25",
    "cmake.png": "https://cdn.simpleicons.org/cmake/064F8C",
    "linux.png": "https://cdn.simpleicons.org/linux/FCC624",
    "ubuntu.png": "https://cdn.simpleicons.org/ubuntu/E95420",
    "docker.png": "https://cdn.simpleicons.org/docker/2496ED",
    "git.png": "https://cdn.simpleicons.org/git/F05032",

    # Perception & ML
    "opencv.png": "https://cdn.simpleicons.org/opencv/5C3EE8",
    "pytorch.png": "https://cdn.simpleicons.org/pytorch/EE4C2C",
    "tensorflow.png": "https://cdn.simpleicons.org/tensorflow/FF6F00",
    "scikit-learn.png": "https://cdn.simpleicons.org/scikitlearn/F7931E",
    "numpy.png": "https://cdn.simpleicons.org/numpy/013243",
    "scipy.png": "https://cdn.simpleicons.org/scipy/8CAAE6",
    "pandas.png": "https://cdn.simpleicons.org/pandas/150458",

    # Design & CAD
    "solidworks.png": "https://cdn.simpleicons.org/dassaultsystemes/00539B",
    "urdf.png": "https://cdn.simpleicons.org/ros/22314E",
    "rviz2.png": "https://cdn.simpleicons.org/ros/22314E",
    "visual-design.png": "https://cdn.simpleicons.org/figma/F24E1E",
}

TEMP_DIR = Path("./temp_logos")
ZIP_NAME = "tech_logos.zip"

def download_and_zip():
    TEMP_DIR.mkdir(exist_ok=True)
    headers = {'User-Agent': 'Mozilla/5.0'}

    print("Downloading logo PNGs...")
    downloaded_files = []

    for filename, url in LOGO_URLS.items():
        filepath = TEMP_DIR / filename
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
                out_file.write(response.read())
            downloaded_files.append(filepath)
            print(f"  [✓] Downloaded {filename}")
        except Exception as e:
            print(f"  [✗] Failed to download {filename}: {e}")

    # Compress files into ZIP
    print(f"\nCreating archive '{ZIP_NAME}'...")
    with zipfile.ZipFile(ZIP_NAME, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for file in downloaded_files:
            zipf.write(file, arcname=file.name)
            file.unlink()  # Delete temporary file

    TEMP_DIR.rmdir()
    print(f"Done! All logos saved into '{ZIP_NAME}'.")

if __name__ == "__main__":
    download_and_zip()