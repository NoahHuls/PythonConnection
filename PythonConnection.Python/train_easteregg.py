from tensorflow import keras
import numpy as np
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Flatten, Dense, Dropout, Conv2D, MaxPooling2D, BatchNormalization, GlobalMaxPool2D
from tensorflow.keras.callbacks import EarlyStopping
from os import environ


correct_path = f"{environ['CONDA_PREFIX']}/nvvm/libdevice/libdevice.10.bc"
environ['CUDA_DIR'] = correct_path
environ['XLA_FLAGS'] = f"--xla_gpu_cuda_data_dir={correct_path}"

# Load the data
# data dire easterEgg/

# Load the data
from tensorflow.keras.preprocessing.image import ImageDataGenerator
train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    horizontal_flip=True,
    vertical_flip=True
)

train_generator = train_datagen.flow_from_directory(
    directory='easterEgg',
    target_size=(28, 28),
    color_mode="grayscale",
    batch_size=128,
    class_mode='categorical',
    shuffle=True,
    seed=42,
    subset='training'
)

validation_generator = train_datagen.flow_from_directory(
    directory='easterEgg',
    target_size=(28, 28),
    color_mode="grayscale",
    batch_size=128,
    class_mode='categorical',
    shuffle=True,
    seed=42,
    subset='validation'
)

test_datagen = ImageDataGenerator(rescale=1./255)
test_generator = test_datagen.flow_from_directory(
    directory='easterEgg',
    target_size=(28, 28),
    color_mode="grayscale",
    batch_size=128,
    class_mode='categorical',
    shuffle=True,
    seed=42
)

model = Sequential([Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28,1)),
                                        MaxPooling2D((2, 2)),
                                        Conv2D(64, (3, 3), activation='relu'),
                                        MaxPooling2D((2, 2)),
                                        Conv2D(128, (3, 3), activation='relu'),
                                        GlobalMaxPool2D(),
                                        Dense(128, activation='relu'),
                                        Dense(2, activation='softmax')])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

early_stopping = EarlyStopping(monitor='val_accuracy', patience=5)

history = model.fit(train_generator, epochs=100, validation_data=test_generator, callbacks=[early_stopping], batch_size=128)

model.save('easteregg.h5')
model.save('easteregg.keras')
