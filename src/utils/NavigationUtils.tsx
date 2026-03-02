import {
  CommonActions,
  createNavigationContainerRef,
  StackActions,
} from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

function isReady() {
  return navigationRef.isReady();
}

export function navigate(routeName: string, params?: Record<string, any>) {
  if (isReady()) {
    navigationRef.dispatch(CommonActions.navigate(routeName, params));
  }
}

export function replace(routeName: string, params?: Record<string, any>) {
  if (isReady()) {
    navigationRef.dispatch(StackActions.replace(routeName, params));
  }
}

export function push(routeName: string, params?: Record<string, any>) {
  if (isReady()) {
    navigationRef.dispatch(StackActions.push(routeName, params));
  }
}

export function goBack() {
  if (isReady()) {
    navigationRef.dispatch(CommonActions.goBack());
  }
}

export function resetAndNavigate(routeName: string) {
  if (isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      }),
    );
  }
}
