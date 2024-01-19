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
    list: any[];
};
export const Carousel: FC<IProps> = props => {
    const {
        list,
        delay,
        iterations = -1,
        itemDurations = 2000,
        containerStyle,
        direction = 'horizontal',
        onFinished,
    } = props;
    const [contentLayout, setContentLayout] = useState({ width: 0, height: 0 });
    const [containerLayout, setContainerW] = useState({ width: 0, height: 0 });
    const offsetAni = useRef(new Animated.Value(0)).current;
    const aniRef = useRef<any>();
    const timerRef = useRef<NodeJS.Timeout>();
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
                action(contentLayout.height);
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

export default Carousel;
