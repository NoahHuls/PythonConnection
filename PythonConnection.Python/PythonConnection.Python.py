from _pytest.config import console_main
from flask import Flask, request, jsonify
import model_runtime

app = Flask(__name__)

@app.route('/api/hello-world', methods=['GET'])
def hello_world_with_random():
    random_number = random.randint(1, 100)
    return jsonify(message="Hello, World!", random_number=random_number)

if __name__ == '__main__':
    app.run(debug=True)