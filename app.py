from flask import Flask, render_template, send_from_directory

app = Flask(
    __name__,
    template_folder='Frontend/page',   # ← тут твій home.html
    static_folder='Frontend'           # ← тут картинки, css, js
)

@app.route('/')
def home():
    return render_template('home.html')