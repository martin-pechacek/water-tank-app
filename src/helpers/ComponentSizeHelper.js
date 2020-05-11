const useComponentSize = () => {
  console.log("componentSize")
  const [size, setSize] = useState(1,0);

  const onLayout = useCallback(event => {
    console.log("onLayout")
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};
