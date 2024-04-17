from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import os
import subprocess
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
VIDEO_SAVE_DIR = "C:\\Users\\zhuoc\\Downloads"


@app.route('/analyze-video', methods=['POST'])
def analyze_video():

    video_file = request.files['video']
    filename = secure_filename(video_file.filename)
    temp_video_path = os.path.join(VIDEO_SAVE_DIR, filename)
    video_file.save(temp_video_path)

    processed_video_path = os.path.join(VIDEO_SAVE_DIR, 'processed_' + filename)

    subprocess.run(["poetry", "run", "python", os.path.abspath("run.py"), "--possession", "--model", os.path.abspath("models/ball.pt"), "--video", temp_video_path], check=True)

    if os.path.exists(processed_video_path):
        processed_video_url = f"file:///{processed_video_path.replace(os.sep, '/')}"
    else:
        os.remove(temp_video_path)
        return jsonify({"error": "Processed video file does not exist."}), 404

    return jsonify({"processedVideoUrl": processed_video_url}), 200


if __name__ == "__main__":
    app.run(debug=True)
