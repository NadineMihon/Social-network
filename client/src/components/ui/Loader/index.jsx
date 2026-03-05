import { Container } from "../Container";
import animationData  from "./loader-animation.json";

import * as SC from "./styles";

export const Loader = () => {
    return (
        <SC.Loader 
            animationData={animationData}
            loop={true}
            autoplay={true}
        />
    )
};