"use client";

import Link from "next/link";

import useLoginHandaler from "./_hooks/LoginHandaler";

export default function LoginPage() {
  const { error, isLoading, LoginHandaler } = useLoginHandaler();

  return (
    <>
      <p className="_social_login_content_para _mar_b8">Welcome back</p>
      <h4 className="_social_login_content_title _titl4 _mar_b50">
        Login to your account
      </h4>

      <button type="button" className="_social_login_content_btn _mar_b40">
        <img src="/assets/images/google.svg" alt="Image" className="_google_img" />
        <span>Or sign-in with google</span>
      </button>

      <div className="_social_login_content_bottom_txt _mar_b40">
        <span>Or</span>
      </div>

      <form className="_social_login_form" onSubmit={LoginHandaler}>
        <div className="row">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label className="_social_login_label _mar_b8" htmlFor="loginEmail">
                Email
              </label>
              <input
                id="loginEmail"
                name="email"
                type="email"
                className="form-control _social_login_input"
                required
              />
            </div>
          </div>
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
            <div className="_social_login_form_input _mar_b14">
              <label
                className="_social_login_label _mar_b8"
                htmlFor="loginPassword"
              >
                Password
              </label>
              <input
                id="loginPassword"
                name="password"
                type="password"
                className="form-control _social_login_input"
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

        <div className="row">
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="form-check _social_login_form_check">
              <input
                className="form-check-input _social_login_form_check_input"
                type="radio"
                name="rememberMe"
                id="rememberMe"
                defaultChecked
              />
              <label
                className="form-check-label _social_login_form_check_label"
                htmlFor="rememberMe"
              >
                Remember me
              </label>
            </div>
          </div>
          <div className="col-lg-6 col-xl-6 col-md-6 col-sm-12">
            <div className="_social_login_form_left">
              <p className="_social_login_form_left_para">Forgot password?</p>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-xl-12 col-sm-12">
            <div className="_social_login_form_btn _mar_t40 _mar_b60">
              <button
                type="submit"
                className="_social_login_form_btn_link _btn1"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login now"}
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12">
          <div className="_social_login_bottom_txt">
            <p className="_social_login_bottom_txt_para">
              Dont have an account? <Link href="/register">Create New Account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
