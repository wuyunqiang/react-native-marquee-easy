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
};
export const Carousel: FC<IProps> = props => {
    const {
        children,
        delay,
        iterations = -1,
        itemDurations = 2000,
        containerStyle,
        direction = 'horizontal',
        onFinished,
    } = props;
    const list = Array.isArray(children) ? children : [children];
    const [contentLayout, setContentLayout] = useState({ width: 0, height: 0 });
    const [containerLayout, setContainerW] = useState({ width: 0, height: 0 });
    const offsetAni = useRef(new Animated.Value(0)).current;
    const aniRef = useRef<any>();
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
        if (direction === 'horizontal') {
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
        } else {
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
        }
    }, [contentLayout, containerLayout, iterations]);

    let showLast = contentLayout.width > containerLayout.width;
    if (direction === 'vertical') {
        showLast = contentLayout.height > containerLayout.height;
    }
    return (
        <View
            style={[styles.container, containerStyle]}
            onLayout={event => {
                setContainerW(event?.nativeEvent?.layout || {});
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
                        setContentLayout(event?.nativeEvent?.layout || {});
                    }}
                >
                    {children}
                </View>
                {showLast ? (
                    <View
                        style={[styles.item, direction === 'horizontal' && styles.horizontal]}
                        onLayout={event => {
                            setContentLayout(event?.nativeEvent?.layout || {});
                        }}
                    >
                        {children}
                    </View>
                ) : null}
            </Animated.View>
        </View>
    );
};

export default Carousel;
