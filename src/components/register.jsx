import { useState } from 'react';
export default function Register() {

// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);

return (
<div className="form">
<div>
<h1>User Registration</h1>
</div>

<form>
{/* Labels and inputs for form data */}
<label className="label">Name</label>
<input className="input"
value={name} type="text" />

<label className="label">Email</label>
<input className="input"
value={email} type="email" />

<label className="label">Password</label>
<input className="input"
value={password} type="password" />

<button className="btn" type="submit">
Submit
</button>
</form>
</div>
);
}