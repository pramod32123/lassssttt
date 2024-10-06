import * as tf from '@tensorflow/tfjs';

// Simple AI model for project recommendation
export async function createProjectRecommendationModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 10, inputShape: [5], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));
  
  model.compile({ optimizer: 'adam', loss: 'binaryCrossentropy', metrics: ['accuracy'] });
  
  // Train the model with some dummy data
  const xs = tf.randomNormal([100, 5]);
  const ys = tf.randomUniform([100, 1]);
  
  await model.fit(xs, ys, {
    epochs: 10,
    batchSize: 32,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
      }
    }
  });
  
  return model;
}

// Function to get project recommendations
export async function getProjectRecommendations(userProfile: number[], model: tf.LayersModel) {
  const input = tf.tensor2d([userProfile]);
  const prediction = model.predict(input) as tf.Tensor;
  const score = await prediction.data();
  return score[0]; // Return recommendation score
}

// Simple AI model for risk assessment
export async function createRiskAssessmentModel() {
  const model = tf.sequential();
  model.add(tf.layers.dense({ units: 8, inputShape: [4], activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1, activation: 'linear' }));
  
  model.compile({ optimizer: 'rmsprop', loss: 'meanSquaredError' });
  
  // Train the model with some dummy data
  const xs = tf.randomNormal([100, 4]);
  const ys = tf.randomUniform([100, 1]);
  
  await model.fit(xs, ys, {
    epochs: 10,
    batchSize: 32,
    callbacks: {
      onEpochEnd: (epoch, logs) => {
        console.log(`Epoch ${epoch}: loss = ${logs?.loss}`);
      }
    }
  });
  
  return model;
}

// Function to assess project risk
export async function assessProjectRisk(projectData: number[], model: tf.LayersModel) {
  const input = tf.tensor2d([projectData]);
  const prediction = model.predict(input) as tf.Tensor;
  const risk = await prediction.data();
  return risk[0]; // Return risk score
}