import React, { useEffect } from 'react';
import { useDidShow, useDidHide } from '@tarojs/taro';
import { usePlatingStore } from '@/store/plating';
import './app.scss';

function App(props) {
  const initialize = usePlatingStore(state => state.initialize);

  useEffect(() => {
    console.log('[App] 初始化 store，从本地存储加载数据');
    initialize();
  }, [initialize]);

  useDidShow(() => {});
  useDidHide(() => {});

  return props.children;
}

export default App;
