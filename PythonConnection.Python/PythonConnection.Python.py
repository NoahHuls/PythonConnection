from flask import Flask, request, jsonify
import model_runtime

app = Flask(__name__)

class Prediction:
    def __init__(self, prediction):
        self.prediction = prediction

@app.route('/api/predict/number', methods=['POST'])
def predict_number():
    data = request.get_json()['image']

    model = model_runtime.ModelRuntime()
    prediction_result = Prediction(prediction=model.predict(data))
    print(prediction_result)

    return jsonify(message="Prediction:", data=prediction_result.__dict__)

if __name__ == '__main__':
    app.run(debug=True)