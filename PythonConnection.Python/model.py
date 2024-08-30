from tensorflow import keras
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Flatten, Dense, Dropout, Conv2D, MaxPooling2D, BatchNormalization, GlobalMaxPool2D
from tensorflow.keras.callbacks import EarlyStopping
from os import environ

correct_path = f"{environ['CONDA_PREFIX']}/nvvm/libdevice/libdevice.10.bc"
environ['CUDA_DIR'] = correct_path
environ['XLA_FLAGS'] = f"--xla_gpu_cuda_data_dir={correct_path}"

(x_train, y_train), (x_test, y_test) = keras.datasets.mnist.load_data()

x_train = x_train / 255.0
x_test = x_test / 255.0


model = Sequential([Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28,1)),
                                        MaxPooling2D((2, 2)),
                                        Conv2D(64, (3, 3), activation='relu'),
                                        MaxPooling2D((2, 2)),
                                        Conv2D(128, (3, 3), activation='relu'),
                                        GlobalMaxPool2D(),
                                        Dense(128, activation='relu'),
                                        Dense(10, activation='softmax')])

model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

early_stopping = EarlyStopping(monitor='val_accuracy', patience=5)

history = model.fit(x_train, y_train, epochs=100, validation_data=(x_test, y_test), callbacks=[early_stopping], batch_size=128)

model.save('model.h5')
model.save('model.keras')