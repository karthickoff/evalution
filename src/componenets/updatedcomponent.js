import React, { useState } from "react";
import logo from "../assets/logo.jpg";
import BannerImg from "../assets/login.jpg";

const UpdatedComponent = (OriginalCompoenet) => {
    class NewComponent extends React.Component {
        constructor(props) {
            super(props)

            this.state = {
                logo: logo,
                BannerImg: BannerImg,
            }
        }
        render() {
            return (<OriginalCompoenet logo={this.state.logo} BannerImg={this.state.BannerImg} />)
        }

    }
    // function NewComponent() {
    //     const logo = logo;
    //     const BannerImg = BannerImg
    //     // const [BannerImg, SetBannerImg] = useState(BannerImg);

    //     return (
    //         <OriginalCompoenet logo={logo} BannerImg={BannerImg} />
    //     )
    // }
    return NewComponent;

}
export default UpdatedComponent;

