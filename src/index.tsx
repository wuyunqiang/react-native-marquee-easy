/* eslint-disable react-hooks/exhaustive-deps */
import type { FC } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import type { ViewStyle } from 'react-native';
import { Animated, Easing, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        overflow: 'hidden',
    },
    horizontal: {
        flexDirection: 'row',
    },
    item: {
        display: 'flex',
    },
});

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
        delay,
        iterations = -1,
        itemDurations = 2000,
        swiperItemDurations = 500,
        containerStyle,
        direction = 'horizontal',
        onFinished,
        type = 'normal'
    } = props;
    const list = Array.isArray(children) ? children : [children];
    const [contentLayout, setContentLayout] = useState({ width: 0, height: 0 });
    const [containerLayout, setContainerW] = useState({ width: 0, height: 0 });
    const offsetAni = useRef(new Animated.Value(0)).current;
    const aniRef = useRef<any>();
    const timerRef = useRef<any>();
    const action = (offset: number) => {
        const duration = list.length * itemDurations;
        if (aniRef.current) {
            aniRef.current.stop();
        }
        aniRef.current = Animated.loop(
            Animated.sequence([
                Animated.timing(offsetAni, {
                    toValue: -offset,
                    duration,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
                Animated.timing(offsetAni, {
                    toValue: 0,
                    duration: 0,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }),
            ]),
            {
                iterations,
            },
        );
        aniRef.current.start(() => {
            onFinished && onFinished();
        });
    };

    const offsetRef = useRef(0)
    const swiper = (offset: number) =>{
        if(!offsetRef.current){
            offsetRef.current = offset;
        }
        const offsetItem = offset;
        let init = true;
        let count = 0;
        let loop = 0;
        const exe = (distance) =>{
            timerRef.current && clearTimeout(timerRef.current)
            if(iterations > 0 && loop > iterations ){
                return;
            }
            timerRef.current = setTimeout(()=>{
                let duration = swiperItemDurations;
                if(offsetRef.current !== offset){
                    duration = 0;
                }
                Animated.timing(offsetAni, {
                    toValue: -distance,
                    duration,
                    useNativeDriver: true,
                    easing: Easing.linear,
                }).start(()=>{
                    offsetRef.current = offset;
                    /**循环一轮到结尾后恢复到第一个*/
                    if(count % list.length === 0){
                        count = 0;
                        loop = loop + 1;
                        offsetAni.setValue(0);
                        exe(offsetItem);
                        return;
                    }
                    exe(distance + offsetItem);
                })
                init = false;
                count++;
            }, init ? 0 : itemDurations)
        }
        exe(offsetItem)
    }

    useEffect(() => {
        if(list.length <=1 || direction !== 'horizontal'){
            return;
        }
        if (
            contentLayout.width &&
            containerLayout.width &&
            contentLayout.width > containerLayout.width &&
            iterations !== 0
        ) {
            setTimeout(() => {
                action(contentLayout.width);
            }, delay || 0);
        }
    }, [contentLayout.width, containerLayout.width, iterations]);


    useEffect(() => {
        if(list.length <=1 || direction !== 'vertical'){
            return;
        }

        if (
            contentLayout.height &&
            containerLayout.height &&
            contentLayout.height > containerLayout.height &&
            iterations !== 0
        ) {
            setTimeout(() => {
                swiper(containerLayout.height);
            }, delay || 0);
        }
    }, [contentLayout.height, containerLayout.height, iterations]);


    useEffect(()=>{
        return ()=>{
            if (aniRef.current) {
                aniRef.current.stop();
            }
            if(timerRef.current){
                clearTimeout(timerRef.current)
            }
        }
    },[])

    let showLast = contentLayout.width > containerLayout.width;
    if (direction === 'vertical') {
        showLast = contentLayout.height > containerLayout.height;
    }
    return (
        <View
            style={[styles.container, containerStyle]}
            onLayout={event => {
                const layout = event?.nativeEvent?.layout || {}
                setContainerW(layout as any);
            }}
        >
            <Animated.View
                style={[
                    styles.item,
                    direction === 'horizontal' && styles.horizontal,
                    {
                        transform:
                            direction === 'horizontal'
                                ? [{ translateX: offsetAni }]
                                : [{ translateY: offsetAni }],
                    },
                ]}
            >
                <View
                    style={[styles.item, direction === 'horizontal' && styles.horizontal]}
                    onLayout={event => {
                        const layout = event?.nativeEvent?.layout || {}
                        setContentLayout(layout as any);
                    }}
                >
                    {list}
                </View>
                {showLast ? (
                    <View style={[styles.item, direction === 'horizontal' && styles.horizontal]}>
                        {list.slice(0,1)}
                    </View>
                ) : null}
            </Animated.View>
        </View>
    );
};

export default Marquee;
