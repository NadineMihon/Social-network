import * as SC from "./styles";

const mapVariantToTag = {
    title: 'h2',
    subtitle: 'h3',
};

export const Typo = ({ variant = 'body', children, ...props }) => {
    const tag = mapVariantToTag[variant] || 'p';

    return (
        <SC.Typo as={tag} data-variant={variant} {...props}>{children}</SC.Typo>
    )
};