
import React, { useState } from 'react';
import './Payment.css';
import Footer from './footer';
import Nav from './Nav';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51OzmIdSJDrpIZEnJtXfsbdPphTNLJPn7Ln9T1TPuYAuhcMvuilw3kQYS2X3pTzqLltcNy1hYrKsfWUHvAVaArsWt00rSF8QqLk');

const Payment = ({ totalPrice }) => {
    const [clientSecret, setClientSecret] = useState('');
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [country, setCountry] = useState('');
    const [cvc, setCVC] = useState('');
    const [error, setError] = useState(null);
    const [paymentStatus, setPaymentStatus] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!name || !address || !country ) {
            setError('Please enter all required information.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:8000/create-payment-intent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: totalPrice, name, address, country})
            });

            const data = await response.json();

            if (data.error) {
                setError(data.error);
            } else {
                setClientSecret(data.client_secret);
            }
        } catch (error) {
            console.error('Error:', error);
            setError('An error occurred while processing your payment.');
        }
    };

    const handlePaymentSuccess = () => {
        setPaymentStatus('success');
    };

    return (
        <>
        <Nav/>
        <div className='main_pay'>
            
            <form onSubmit={handleSubmit} className='payment'>
                <label className='pay_lab'>
                    Customer Name:
                    <input className='pay_inp'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </label>
                <label className='pay_lab'>
                    Customer Address:
                    <textarea className='pay_inp'
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </label>
                <label className='pay_lab'>
                    Country:
                    <select className='pay_inp'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    >
                        <option value="">Select Country</option>
                        <option value="US">United States</option>
                        <option value="CA">Canada</option>
                        <option value="AF">Afghanistan</option>
<option value="AL">Albania</option>
<option value="DZ">Algeria</option>
<option value="AD">Andorra</option>
<option value="AO">Angola</option>
<option value="AI">Anguilla</option>
<option value="AG">Antigua & Barbuda</option>
<option value="AR">Argentina</option>
<option value="AM">Armenia</option>
<option value="AW">Aruba</option>
<option value="AU">Australia</option>
<option value="AT">Austria</option>
<option value="AZ">Azerbaijan</option>
<option value="BS">Bahamas</option>
<option value="BH">Bahrain</option>
<option value="BD">Bangladesh</option>
<option value="BB">Barbados</option>
<option value="BY">Belarus</option>
<option value="BE">Belgium</option>
<option value="BZ">Belize</option>
<option value="BJ">Benin</option>
<option value="BM">Bermuda</option>
<option value="BT">Bhutan</option>
<option value="BO">Bolivia</option>
<option value="BA">Bosnia & Herzegovina</option>
<option value="BW">Botswana</option>
<option value="BR">Brazil</option>
<option value="VG">British Virgin Islands</option>
<option value="BN">Brunei</option>
<option value="BG">Bulgaria</option>
<option value="BF">Burkina Faso</option>
<option value="BI">Burundi</option>
<option value="KH">Cambodia</option>
<option value="CM">Cameroon</option>
<option value="CA">Canada</option>
<option value="CV">Cape Verde</option>
<option value="KY">Cayman Islands</option>
<option value="CF">Central African Republic</option>
<option value="TD">Chad</option>
<option value="CL">Chile</option>
<option value="CN">China</option>
<option value="CO">Colombia</option>
<option value="KM">Comoros</option>
<option value="CG">Congo - Brazzaville</option>
<option value="CD">Congo - Kinshasa</option>
<option value="CK">Cook Islands</option>
<option value="CR">Costa Rica</option>
<option value="HR">Croatia</option>
<option value="CU">Cuba</option>
<option value="CW">Curaçao</option>
<option value="CY">Cyprus</option>
<option value="CZ">Czechia</option>
<option value="DK">Denmark</option>
<option value="DJ">Djibouti</option>
<option value="DM">Dominica</option>
<option value="DO">Dominican Republic</option>
<option value="EC">Ecuador</option>
<option value="EG">Egypt</option>
<option value="SV">El Salvador</option>
<option value="GQ">Equatorial Guinea</option>
<option value="ER">Eritrea</option>
<option value="EE">Estonia</option>
<option value="SZ">Eswatini</option>
<option value="ET">Ethiopia</option>
<option value="FK">Falkland Islands</option>
<option value="FO">Faroe Islands</option>
<option value="FJ">Fiji</option>
<option value="FI">Finland</option>
<option value="FR">France</option>
<option value="GF">French Guiana</option>
<option value="PF">French Polynesia</option>
<option value="GA">Gabon</option>
<option value="GM">Gambia</option>
<option value="GE">Georgia</option>
<option value="DE">Germany</option>
<option value="GH">Ghana</option>
<option value="GI">Gibraltar</option>
<option value="GR">Greece</option>
<option value="GL">Greenland</option>
<option value="GD">Grenada</option>
<option value="GP">Guadeloupe</option>
<option value="GT">Guatemala</option>
<option value="GN">Guinea</option>
<option value="GW">Guinea-Bissau</option>
<option value="GY">Guyana</option>
<option value="HT">Haiti</option>
<option value="HN">Honduras</option>
<option value="HK">Hong Kong SAR China</option>
<option value="HU">Hungary</option>
<option value="IS">Iceland</option>
<option value="IN">India</option>
<option value="ID">Indonesia</option>
<option value="IR">Iran</option>
<option value="IQ">Iraq</option>
<option value="IE">Ireland</option>
<option value="IM">Isle of Man</option>
<option value="IL">Israel</option>
<option value="IT">Italy</option>
<option value="CI">Ivory Coast</option>
<option value="JM">Jamaica</option>
<option value="JP">Japan</option>
<option value="JE">Jersey</option>
<option value="JO">Jordan</option>
<option value="KZ">Kazakhstan</option>
<option value="KE">Kenya</option>
<option value="KI">Kiribati</option>
<option value="XK">Kosovo</option>
<option value="KW">Kuwait</option>
<option value="KG">Kyrgyzstan</option>
<option value="LA">Laos</option>
<option value="LV">Latvia</option>
<option value="LB">Lebanon</option>
<option value="LS">Lesotho</option>
<option value="LR">Liberia</option>
<option value="LY">Libya</option>
<option value="LI">Liechtenstein</option>
<option value="LT">Lithuania</option>
<option value="LU">Luxembourg</option>
<option value="MO">Macao SAR China</option>
<option value="MG">Madagascar</option>
<option value="MW">Malawi</option>
<option value="MY">Malaysia</option>


                    </select>
                </label>
                <button type="submit" className='paybtn'>Pay Now</button>
            </form>
            {paymentStatus === 'success' && <div>Payment successful!</div>}
            {clientSecret && !paymentStatus && (
                <Elements stripe={stripePromise}>
                    <MyCheckoutForm clientSecret={clientSecret} setError={setError} handlePaymentSuccess={handlePaymentSuccess} name={name} address={address} country={country} />
                </Elements>
            )}
            {error && <div>{error}</div>}
        </div>
        <Footer  />
        </>
    );
};

const MyCheckoutForm = ({ clientSecret, setError, handlePaymentSuccess, name, address, country }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: name,
                    address: {
                        line1: address,
                        city: '', // Add city if required
                        country: country,
                    }
                }
            }
        });

        if (result.error) {
            setError(result.error.message);
        } else if (result.paymentIntent && result.paymentIntent.status === 'succeeded') {
            handlePaymentSuccess();
        } else {
            setError('Failed to complete payment.');
        }
    };

    return (
   
        <form onSubmit={handleSubmit} style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '5px' ,marginTop: '200px',backgroundColor: '#BC8687'}}>
           <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '35px',
                            color: 'black',
                            '::placeholder': {
                                color: 'black',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" style={{ marginLeft: '18px',marginTop: '60px', backgroundColor: '#B03D61', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer',width:"600px" }}>Confirm Payment</button>
        </form>
     
    );
};

export default Payment;
