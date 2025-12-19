from flask import Flask, render_template, abort, send_from_directory
import os

app = Flask(__name__, template_folder='frontend/page')

@app.route('/')
def home():
    return render_template('home.html')

# універсальний маршрут для всіх html файлів
@app.route('/<page>.html')
def serve_page(page):
    file_path = os.path.join(app.template_folder, f"{page}.html")
    if os.path.exists(file_path):
        return render_template(f"{page}.html")
    else:
        abort(404)

# маршрут для картинок з папки page/image
@app.route('/image/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.template_folder, 'image'), filename)

# маршрут для js/css якщо вони теж у page/
@app.route('/<path:filename>')
def serve_assets(filename):
    file_path = os.path.join(app.template_folder, filename)
    if os.path.exists(file_path):
        return send_from_directory(app.template_folder, filename)
    else:
        abort(404)

if __name__ == '__main__':
    app.run(debug=True)
