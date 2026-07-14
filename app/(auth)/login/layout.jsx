import Image from "next/image";

export default function LoginLayout({ children }) {
  return (
    <section className="_social_login_wrapper _layout_main_wrapper">
      <div className="_shape_one">
        <Image
          src="/assets/images/shape1.svg"
          alt=""
          width={120}
          height={120}
          className="_shape_img"
        />
        <Image
          src="/assets/images/dark_shape.svg"
          alt=""
          width={120}
          height={120}
          className="_dark_shape"
        />
      </div>
      <div className="_shape_two">
        <Image
          src="/assets/images/shape2.svg"
          alt=""
          width={120}
          height={120}
          className="_shape_img"
        />
        <Image
          src="/assets/images/dark_shape1.svg"
          alt=""
          width={120}
          height={120}
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
      <div className="_shape_three">
        <Image
          src="/assets/images/shape3.svg"
          alt=""
          width={120}
          height={120}
          className="_shape_img"
        />
        <Image
          src="/assets/images/dark_shape2.svg"
          alt=""
          width={120}
          height={120}
          className="_dark_shape _dark_shape_opacity"
        />
      </div>
      <div className="_social_login_wrap">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
              <div className="_social_login_left">
                <div className="_social_login_left_image">
                  <Image
                    src="/assets/images/login.png"
                    alt="Image"
                    width={820}
                    height={720}
                    className="_left_img"
                  />
                </div>
              </div>
            </div>
            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
              <div className="_social_login_content">
                <div className="_social_login_left_logo _mar_b28">
                  <Image
                    src="/assets/images/logo.svg"
                    alt="Image"
                    width={180}
                    height={48}
                    className="_left_logo"
                  />
                </div>
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
