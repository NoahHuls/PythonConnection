from tensorflow.keras.models import load_model
import numpy as np

class ModelRuntime:
    def __init__(self):
        self.model = load_model('model.keras')
        #self.dickModel = load_model('model.h5')

    def predict(self, x):
        x = np.array(x).reshape(-1, 28, 28, 1)
        prediction = self.model.predict(x).argmax(axis= -1)
        return int(prediction[0])

    def ttpCheck(self, x):
        #x = np.array(x).reshape(-1, 28, 28, 1)
        #prediction = self.dickModel.predict(x).argmax(axis= -1)
        #return prediction.argmax(axis= -1)
        return 0

