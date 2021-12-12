import Email from 'emailjs-com'
import React, { useRef } from 'react'

function EmailForm() {

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        Email.sendForm('Gmail', 'template_zbdlqc8', form.current, 'user_I5WNIKu3JDKcfOvaoKXHN')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    };

    return (

        <form ref={form} onSubmit={sendEmail}>
            <div className="form-group">
                <label><h5>From</h5></label>
                <div className="input-group">
                    <div className="input-group-prepend">
                    </div>
                    <input type="text" name="subject" className="form-control" id="validationDefaultUsername" value="Tombola" aria-describedby="inputGroupPrepend2" readOnly />
                </div>
                {/* <small className="text-danger">{error.email}</small> */}
            </div>
            <div className="form-group">
                <label><h5>To</h5></label>
                <div className="input-group">
                    <div className="input-group-prepend">
                    </div>
                    <input type="text" name="email" className="form-control" id="validationDefaultUsername" placeholder="Email" aria-describedby="inputGroupPrepend2" required />
                </div>
                {/* <small className="text-danger">{error.email}</small> */}
            </div>
            <div className="form-group">
                <label><h5>Comment</h5></label>
                <div className="input-group">
                    <div className="input-group-prepend">
                    </div>
                    {/* <input type="text" name="email"  className="form-control" id="validationDefaultUsername" placeholder="Email" aria-describedby="inputGroupPrepend2" required /> */}
                    <textarea type="text" name="comment" className="form-control" id="validationDefaultUsername" placeholder="Comment" aria-describedby="inputGroupPrepend2" rows="3" required></textarea>
                </div>
                {/* <small className="text-danger">{error.email}</small> */}
            </div>
            <br />
            <div className="form-group">
                <input type="submit" value="Send" className="btn btn-primary btn-sm" />
            </div>

        </form>
    )
}

export default EmailForm
