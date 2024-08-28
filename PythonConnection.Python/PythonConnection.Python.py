# Install Flask if you haven't already: pip install flask
from flask import Flask, jsonify
import random

app = Flask(__name__)

@app.route('/api/hello-world', methods=['GET'])
def hello_world_with_random():
    random_number = random.randint(1, 100)
    return jsonify(message="Hello, World!", random_number=random_number)

if __name__ == '__main__':
    app.run(debug=True)