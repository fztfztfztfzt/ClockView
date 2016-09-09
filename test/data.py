from flask import Flask
from flask.ext.cors import CORS
app = Flask(__name__)
CORS(app)
@app.route('/hello')
def hello_world():
    return 'Hello World!'
@app.route('/')
def index():
    return 'Index Page'

if __name__ == '__main__':
    app.run()
