from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import os
from PIL import Image
import numpy as np
import io

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "http://localhost:5173"}})


@app.route('/api/watermark', methods=['POST'])
def upload_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    try:
        # Get the original file name without extension
        original_filename = os.path.splitext(image_file.filename)[0]

        # Open and process the image
        image = Image.open(image_file)
        if image.mode == 'RGBA':
            image = image.convert('RGB')

        # Apply watermark
        watermarked_image = apply_watermark(image)

        # Save the watermarked image to a buffer
        buffer = io.BytesIO()
        watermarked_image.save(buffer, format='JPEG')
        buffer.seek(0)

        # Send the image as a downloadable file
        return send_file(
            buffer,
            mimetype='image/jpeg',
            as_attachment=True,
            # File name for download
            download_name=f"{original_filename}_MarkAI.jpg"
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500


def apply_watermark(image):
    """Apply a simple watermark using LSB manipulation."""
    img_array = np.array(image, dtype=np.uint8)
    # A basic watermark pattern
    watermark = np.ones_like(img_array, dtype=np.uint8)
    watermarked = (img_array & 0xFE) | (
        watermark & 1)   # Embed watermark in LSB
    return Image.fromarray(watermarked)


@app.route('/api/detect', methods=['POST'])
def detect_image():
    if 'image' not in request.files:
        return jsonify({'error': 'No image provided'}), 400

    image_file = request.files['image']
    try:
        # Open and process the image
        image = Image.open(image_file)
        if image.mode == 'RGBA':
            image = image.convert('RGB')

        # Detect watermark and return the result as a serializable dictionary
        result = detect_watermark(image)

        # Ensure you're sending a serializable dictionary
        return jsonify(result), 200
    except Exception as e:
        return jsonify({'error': f'Error detecting watermark: {str(e)}'}), 500


def detect_watermark(image):
    img_array = np.array(image, dtype=np.uint8)
    lsb = img_array & 0x01  # Extract the LSB (Least Significant Bit)
    watermark_percentage = (np.sum(lsb) / lsb.size)*100
    if watermark_percentage > 50:
        val = 1
    else:
        val = 0

    # Return a dictionary with the boolean and numeric value
    return {
        # Explicitly convert to Python bool
        'isAIGenerated': bool(val),
        # Explicitly convert to float
        'confidence': float(watermark_percentage)
    }


if __name__ == '__main__':
    app.run(debug=True)
