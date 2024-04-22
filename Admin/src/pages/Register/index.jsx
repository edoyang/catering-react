import './style.scss';

const Register = () => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      firstname: event.target.firstname.value,
      lastname: event.target.lastname.value,
      email: event.target.email.value,
      password: event.target.password.value,
      phone: event.target.phone.value,
      address: event.target.address.value,
      city: event.target.city.value
    };

    try {
        const response = await fetch('http://localhost:5000/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData)
        });
    
        if (response.ok) {
          const result = await response.json();
          alert(result.message);
        } else {
          const errorResult = await response.json();
          throw new Error(errorResult.error); 
        }
      } catch (error) {
        alert(`Registration failed: ${error.message}`);
      }
    };

  return (
    <div className='register-page'>
      <div className="register">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="firstname">First Name</label>
                <div className="form-input">
                    <img src="person.svg" alt="person.svg" />
                    <input type="text" id="firstname" name="firstname" placeholder='First name' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="lastname">Last Name</label>
                <div className="form-input">
                    <img src="person.svg" alt="person.svg" />
                    <input type="text" id="lastname" name="lastname" placeholder='Last name' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="email">Email</label>
                <div className="form-input">
                    <img src="mail.svg" alt="mail.svg" />
                    <input type="email" id="email" name="email" placeholder='Email address' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="form-input">
                    <img src="password.svg" alt="password.svg" />
                    <input type="password" id="password" name="password" placeholder='Password' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <div className="form-input">
                    <img src="password.svg" alt="password.svg" />
                    <input type="password" id="confirm-password" name="confirm-password" placeholder='Confirm Password' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <div className="form-input">
                    <img src="phone.svg" alt="phone.svg" />
                    <input type="tel" id="phone" name="phone" placeholder='Phone number' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="address">Address</label>
                <div className="form-input">
                    <img src="address.svg" alt="address.svg" />
                    <input type="text" id="address" name="address" placeholder='Address' />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="city">City</label>
                <div className="form-input">
                    <img src="city.svg" alt="city.svg" />
                    <input type="text" id="city" name="city" placeholder='City' />
                </div>
            </div>
            <button type="submit">Register</button>
        </form>
    </div>
</div>
  )
}

export default Register