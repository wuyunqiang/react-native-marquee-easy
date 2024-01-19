import type { FC } from 'react';
import React  from 'react';
import type { ViewStyle } from 'react-native';
import Swipe from './swipe'
import Normal from './normal'


export type IProps = {
    direction?: 'horizontal' | 'vertical';
    delay?: number;
    iterations?: number;
    itemDurations?: number;
    containerStyle?: ViewStyle;
    onFinished?: () => void;
    children: any;
    type?: 'swipe' | 'normal';
    swiperItemDurations?: number;
};
export const Marquee: FC<IProps> = props => {
    const {
        children,
        type = 'swipe'
    } = props;
    const list = Array.isArray(children) ? children : [children];
    if(type === 'swipe') {
        return <Swipe list={list} {...props}></Swipe>
    }
    return (<Normal list={list} {...props}></Normal>);
};

export default Marquee;
