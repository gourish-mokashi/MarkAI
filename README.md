# MarkAI ![MIT License](https://img.shields.io/badge/License-MIT-green) ![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)

MarkAI is an AI-generated image Detection System. It comprises two primary tools:

1. **Watermarking Tool**: Adds a unique watermark to images.
2. **Detection Tool**: Detects the watermark in images to determine if they are AI-generated.

## Project Goal
The ultimate goal of MarkAI is to integrate its watermarking system into many generative AI models. By doing so, our detection system can easily identify any image generated through these models.

---

## Features
- **Watermarking Tool**:
  - Upload an image to apply a unique watermark.
  - Download the watermarked image with the original file name and a suffix.

- **Detection Tool**:
  - Upload an image to verify if it is AI-generated.
  - Get confidence levels for the detection.

---

## Tech Stack

### Frontend
- **React.js**: For building an interactive and responsive user interface.
- **TailwindCSS**: For styling and layout.
- **Lucide React**: For icon integration.

### Backend
- **Express.js**: API handling.
- **Python**: For advanced AI-related operations (if applicable).

### Additional Tools
- **Fetch API**: For seamless API communication.
- **HTML5 File APIs**: For image uploads and downloads.

---

## Use Cases

1. **Generative AI Platforms**:
   - Integrate MarkAI’s watermarking system into AI models to ensure traceability of generated content.

2. **Content Verification**:
   - Detect if an image is AI-generated to address ethical concerns in media, design, and education.

3. **Digital Rights Management**:
   - Enable organizations to manage and identify AI-generated visuals in their ecosystem.

---

## How to Run

1. Clone the Repository:
   ```bash
   git clone https://github.com/gourish-mokashi/MarkAI.git
   cd MarkAI
   ```

2. Install Dependencies:
   ```bash
   npm install
   ```

3. Start the Development Server:
   ```bash
   npm start
   ```

4. Access the Application:
   - Open [http://localhost:3000](http://localhost:5173) in your browser.

---

## License

MarkAI is licensed under the [MIT License](LICENSE).

---

## Roadmap

- **Phase 1**: Release the MVP with basic watermarking and detection functionalities.
- **Phase 2**: Enhance detection accuracy using AI models.
- **Phase 3**: Partner with generative AI platforms for large-scale integration.

---

## Contact

For any inquiries or contributions, reach out to:
- **Email**: gourishvinayakmokashi@gmail.com
- **GitHub Issues**: Report bugs or request features.

---

## Acknowledgments

Special thanks to all contributors and the open-source community for their support and inspiration.
