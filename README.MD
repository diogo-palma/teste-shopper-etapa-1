# Shopper Test Project

## Overview

Este projeto foi criado para demonstrar um serviço de back-end que gerencia leituras de consumo de água e gás usando um Machine Learning Model (LLM). O aplicativo fornece endpoints para carregar leituras, confirmar valores e listar leituras para clientes específicos.

## Features

- **Upload Readings**: Permite que os usuários carreguem leituras com uma imagem e valor de medição.
- **Confirm Readings**: Permite que os usuários confirmem ou corrijam leituras carregadas anteriormente.
- **List Readings**: Busca todas as leituras associadas a um cliente específico, com filtragem opcional por tipo de medição (WATER/GAS).

## API Endpoints

### 1. Upload Reading
- **POST** `/upload`
- **Request Body**:
  ```json
  {
    "customer_code": "string",
    "measure_value": integer,
    "image": "base64string"
  }
  ```

- **Response** 
    ```json
    {
        "image_url": "string",
        "measure_value": integer,
        "measure_uuid": "string"
    }
    ```


### 2. Confirm  Reading
- **PATCH** `/confirm`
- **Request Body**:
  ```json
  {
    "measure_uuid": "string",
    "confirmed_value": integer
  }
  ```

- **Response** 
    ```json
    {
        "success": true
    }
    ```


### 3.  List Readings
- **GET** `/<customer_code>/list`
- **Query Parameters:**:
  ```json
    measure_type (opicional, case insensitive): "WATER" or "GAS"
    ```
- **Response** 
 ```json
    {
        "customer_code": "string",
        "measures": [
            {
            "measure_uuid": "string",
            "measure_datetime": "datetime",
            "measure_type": "string",
            "has_confirmed": boolean,
            "image_url": "string"
            }
        ]
    }
```
