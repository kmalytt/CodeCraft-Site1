from flask import Flask, render_template, send_from_directory

app = Flask(__name__, template_folder='../frontend/page')

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/<path:filename>')
def serve_html(filename):
    return send_from_directory('../frontend/page', filename)

if __name__ == '__main__':
    app.run(debug=True)