from _pytest.config import console_main
from flask import Flask, request, jsonify

app = Flask(__name__)

class Prediction:
    def __init__(self, prediction):
        self.prediction = prediction

@app.route('/api/predict/number', methods=['POST'])
def predict_number():
    data = request.get_json()
    print(data)

    prediction_result = Prediction(prediction=999)

    return jsonify(message="Prediction:", data=prediction_result.__dict__)

if __name__ == '__main__':
    app.run(debug=True)