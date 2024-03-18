
# PayFast Express Handler Adapter

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm version](https://badge.fury.io/js/payfast-lib.svg)](https://badge.fury.io/js/payfast-lib)

> A flexible and easy-to-use PayFast Express handler adapter for Node.js applications.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Contributing](#contributing)


## Introduction

PayFast Express Handler Adapter is a lightweight library that simplifies the integration of PayFast payment gateway with your Node.js web applications built on Express.js. PayFast is a popular South African payment processor that allows merchants to accept payments online securely and conveniently.

**Key Features:**

- Seamless integration with Express.js: Easily incorporate PayFast payment handling into your existing Express application with minimal setup.
- Payment Verification: Simplify the process of verifying payment status, ensuring the security of your transactions.
- ITN (Instant Transaction Notification) Support: Receive and process ITN callbacks from PayFast for handling payment updates.
- Customizable Configuration: Configure the adapter based on your specific PayFast account settings and preferences.

Whether you're running an e-commerce platform or managing online donations, the PayFast Express Handler Adapter streamlines the payment process, allowing you to focus on delivering a great user experience.

**Note:** This library is not officially affiliated with PayFast. It serves as an independent, community-driven effort to simplify PayFast integration for developers working with Express.js.


[Continue to Installation](#installation)


## Installation
Go ahead and run the following command to insatll `payfast-lib` into you project

```bash
    npm install payfast-lib
```

## Configuration

- Import the handler config function from `payfast-lib`

```js
    import { configurePayfastExpressHandler } from 'payfast'  //ES6
    const { configurePayfastExpressHandler }  = require('payfast-lib')  // CommonJS
```


- Make sure an express application is already setup and `express.json()` middleware was already configured,
- The `express.json()` function is a built-in middleware function in Express. It parses incoming requests with JSON payloads

- You can configure the middleware buy adding the following line of code
  
```js
  app.use(express.json())
```
- Configure the payfast express handler by adding the following line of code

```js
  configurePayfastExpressHandler(app, {
    merchant_id: "{YOUR_MERCHANT_ID}",
    merchant_key: "{YOUR_MERCHANT_KEY}",
    return_url: "{YOUR_RETURN_URL}",
    cancel_url: "{YOUR_CANCEL_URL}",
    /**
     * Recieve instant payment notifications (IPNs) to this notify webhook. create the webbook on your.
     * This webhook will be called by payfast with the request payload as the details of the payment.
     */
    notify_url: "{YOUR_NOTIFY_URL}",
    env: "sandbox", // "prod" for your production environment
    passPhrase: "{YOUR_PAYFAST_PASSPHRASE}",
  });
```

__NOTE__ : you can get your on `merchant_id` and `merchant_key` after you create your own account. visit [payfast](https://payfast.io/)


## ITN webhook
- On payment completion, payfast sends a post request to the `notify_url`
- the webhook's payload contains useful information that you may want to save to you own database

### Example webhook
- here is an example of the webhook implementation

```js

  app.post('/api/payfast/notify', async (req, res) => {

    const fieldsArray = await request.formData();

    const data = {};

    fieldsArray.forEach((value, key) => {
      data[key] = value;
    });
    

    // Use the parsed data as needed ...

    return res.sendStatus(200)
  })

```

- The signature of the request payload to the webook: 

```js
     {
       m_payment_id: "2954323c-5c1a-4e1d-b021-036415241bb4",
       pf_payment_id: "1731271",
       payment_status: "COMPLETE",
       item_name: "",
       item_description: "",
       amount_gross: "",
       amount_fee: "",
       amount_net: "",
       custom_str1: "",
       custom_str2: "",
       custom_str3: "",
       custom_str4: "",
       custom_str5: "",
       custom_int1: "",
       custom_int2: "",
       custom_int3: "",
       custom_int4: "",
       custom_int5: "",
       name_first: "tina",
       name_last: "",
       email_address: "",
       merchant_id: "",
       signature: "",
    };
```

## Usage
- send a `POST` request to your application on the following endpoint
  `/api/payfast`

### payload: 

```json
    {
      "name_first": "{customer_name}",
      "name_last": "{customer_lastname}",
      "email_address": "{customer_email}",
      "amount": "{amount}",
      "item_name": "test1"
    }

```

- For the full list of possible options see [payfast docs](https://developers.payfast.co.za/docs#step_1_form_fields). for typescript users you can make use of the `PayfastPaymentProps` type


### Response:
```js
  {
    "uuid": "39cebeae-4a53-4f55-9ab2-1b9b958a2bcb",
    "return_url": "http://localhost:3000/return",
    "cancel_url": "http://localhost:3000/cancel"
  }
```

Use the response to render the the Payment form in your user interface using `Payfast` javascript bundle

add the following lines to your `index.html` 

```js
    <head>
      <script src="https://sandbox.payfast.co.za/onsite/engine.js" />
    </head>
```
__NOTE__: use `https://www.payfast.co.za/onsite/engine.js` for __production__ env refer to payfast docs


### Rendering the Payfast widget in your website

### Using React

```jsx
    const handlePayment = async (data) => {
      //assuming you react bundle is running on the same server as the backend

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

       const result = await fetch('/api/payfast', {
        method: "POST",
        headers,
        body: JSON.stringify({
          name_first: "Dellan",
          name_last: "Much",
          email_address: "d@testc.com",
          amount: "21",
          item_name:"test"

        })
       })

       const data = result.json()


      //Opening the payfast UI widget
      window.payfast_do_onsite_payment({
        uuid: data.uuid,
        return_url: data.return_url,
        cancel_url: data.cancel_url
      })

    }

```

## Next.js 14 support
Use the response to render the the Payment form in your user interface using `Payfast` javascript bundle

add the following lines to your `page.ts` within your form component 

```tsx
import Script from 'next/script'

<Script src="https://sandbox.payfast.co.za/onsite/engine.js" />
```
__NOTE__: use `https://www.payfast.co.za/onsite/engine.js` for __production__ env refer to payfast docs


Add a new payfast api route to your project by creating the following folder structure
```
app
└── api
    └── payfast
        └── route.ts

```
add the following lines of code to the `route.js`
```ts
import { nextPayfastHandler } from "payfast-lib";

export const POST = nextPayfastHandler({
  merchant_id: "{YOUR_MERCHANT_ID}",
  merchant_key: "{YOUR_MERCHANT_KEY}",
  return_url: "{YOUR_RETURN_URL}",
  cancel_url: "{YOUR_CANCEL_URL}",
  /**
   * Recieve instant payment notifications (IPNs) to this notify webhook. create the webbook on your.
   * This webhook will be called by payfast with the request payload as the details of the payment.
   */
  notify_url: "{YOUR_NOTIFY_URL}",
  env: "sandbox", // "prod" for your production environment
  passPhrase: "{YOUR_PAYFAST_PASSPHRASE}",
});

```

- send a `POST` request to your application on the following endpoint
  `/api/payfast`

### payload: 

```json
    {
      "name_first": "{customer_name}",
      "name_last": "{customer_lastname}",
      "email_address": "{customer_email}",
      "amount": "{amount}",
      "item_name": "test1"
    }

```

### Response:
```js
  {
    "uuid": "39cebeae-4a53-4f55-9ab2-1b9b958a2bcb",
    "return_url": "http://localhost:3000/return",
    "cancel_url": "http://localhost:3000/cancel"
  }
```

Proceed to you this response as instructed in the [Using react](#using-react)






## Contributing

Thank you for considering contributing to our project! We welcome contributions from the community to help improve this project and make it better for everyone.

### Issues

If you encounter any issues or bugs while using our project, please [open a new issue](https://github.com/mactunechy/payfast-lib/issues) on GitHub. Please make sure to include detailed information about the problem, steps to reproduce it, and the environment in which you encountered it.

### Pull Requests

We encourage pull requests from the community! If you have an improvement or new feature you'd like to contribute, please follow these steps:

1. Fork the repository and create a new branch for your feature or bug fix.
2. Make your changes and write tests to cover any new functionality.
3. Ensure that the existing tests pass and write additional tests for any bug fixes.
4. Commit your changes and push the new branch to your forked repository.
5. Submit a pull request to our main repository, including a detailed description of the changes you made and any relevant information.

We will review your pull request as soon as possible and provide feedback if needed. We value your contributions and will work with you to ensure your changes are integrated smoothly.
d

Your contributions are essential to the success of this project, and we are grateful for your help in making it better for everyone. If you have any questions or need further assistance, feel free to reach out to us.

Happy coding!















