import React from 'react'

function Hireme() {
const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    message: ''
});

const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
};

const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    });
};

return (
    <div className="hireme">
        <div className="hireme__container">
            <h1>Ready to get started?</h1>
            <p>Let's work together to build something great.</p>
            
            <form onSubmit={handleSubmit} className="hireme__form">
                <input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Your Message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="hireme__btn">Send Message</button>
            </form>
        </div>
    </div>
)
}

export default Hireme