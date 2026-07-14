"use client";

import Link from "next/link";

import useRegisterHandaler from "./_hooks/RegisterHandaler";

export default function RegisterPage() {
  const { error, success, isLoading, RegisterHandaler } = useRegisterHandaler();

  return (
    <>
      <p className="_social_registration_content_para _mar_b8">Get Started Now</p>
      <h4 className="_social_registration_content_title _titl4 _mar_b50">
        Registration
      </h4>

      <button type="button" className="_social_registration_content_btn _mar_b40">
        <img src="/assets/images/google.svg" alt="Image" className="_google_img" />
        <span>Register with google</span>
      </button>

      <div className="_social_registration_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      <form className="_social_registration_form" onSubmit={RegisterHandaler}>
        <div className="row">
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8" htmlFor="regFirstName">
                First Name
              </label>
              <input
                id="regFirstName"
                name="first_name"
                type="text"
                className="form-control _social_registration_input"
                required
              />
            </div>
          </div>
          <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8" htmlFor="regLastName">
                Last Name
              </label>
              <input
                id="regLastName"
                name="last_name"
                type="text"
                className="form-control _social_registration_input"
                required
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label className="_social_registration_label _mar_b8" htmlFor="regEmail">
                Email
              </label>
              <input
                id="regEmail"
                name="email"
                type="email"
                className="form-control _social_registration_input"
                required
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label
                className="_social_registration_label _mar_b8"
                htmlFor="regPassword"
              >
                Password
              </label>
              <input
                id="regPassword"
                name="password"
                type="password"
                className="form-control _social_registration_input"
                required
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_registration_form_input _mar_b14">
              <label
                className="_social_registration_label _mar_b8"
                htmlFor="regRepeatPassword"
              >
                Repeat Password
              </label>
              <input
                id="regRepeatPassword"
                name="password_confirmation"
                type="password"
                className="form-control _social_registration_input"
                required
              />
            </div>
          </div>
        </div>

        {error ? (
          <div className="alert alert-danger _mar_b14" role="alert">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="alert alert-success _mar_b14" role="alert">
            {success}
          </div>
        ) : null}

        <div className="row">
          <div className="col-lg-12 col-xl-12 col-md-12 col-sm-12">
            <div className="form-check _social_registration_form_check">
              <input
                className="form-check-input _social_registration_form_check_input"
                type="checkbox"
                name="termsAgree"
                id="termsAgree"
                defaultChecked
              />
              <label
                className="form-check-label _social_registration_form_check_label"
                htmlFor="termsAgree"
              >
                I agree to terms & conditions
              </label>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_registration_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_registration_form_btn_link _btn1"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_registration_bottom_txt">
            <p className="_social_registration_bottom_txt_para">
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
