# Predict

A sales predicting API

# Dev

- The app is dockerized, to run it execute `docker compose up` in its directory and `docker compose down` to stop the
  container
- The app runs on port 4200
- You can find the swagger/openAPI documentation on `localhost:4200/api`

# Model

- The prediction model is based on a simple moving average. This is commonly used to predict stock prices.
- The model can be adjusted through 3 parameters:
    - `window`: the size of the moving average window, the lower this number is, the more the prediction will be
      affected by the most recent data.
    - `adjustmentFactor`: a factor to adjust the prediction, the higher the number, the more the model will be bold. In
      fact, it's just a multiplication factor.
    - `forecast`: the number of weeks to predict.
