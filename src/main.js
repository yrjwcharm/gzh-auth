import {createApp} from 'vue'
import {
  ActionBar,
  ActionBarButton,
  ActionBarIcon,
  AddressEdit,
  AddressList,
    NumberKeyboard,
  Area,
    Rate,
  Button,
  Card,
  Cell,
  CellGroup,
  Checkbox,
  CheckboxGroup,
  Collapse,
  CollapseItem,
  ContactCard,
  DatetimePicker,
  Dialog,
    DropdownItem,
  Divider,
  DropdownMenu,
  Empty,
  Field,
  Form,
  Icon,
  List,
  Loading,
  Overlay,
  Picker,
  Popup,
  PullRefresh,
  Radio,
  RadioGroup,
  Search,
  Stepper,
  SubmitBar,
  Swipe,
  SwipeCell,
  SwipeItem,
  Switch,
  Tab,
    Cascader,
  Tabs,
  Toast,
  TreeSelect,
  Uploader
} from 'vant'
import App from './App.vue'
import store from './store'
import router from './router'
import 'lib-flexible/flexible'
import 'vant/lib/index.css'; // 全局引入样式
import '@/common/style/reset.css'
import eventBus from 'vue3-eventbus'
import ElementPlus from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css'
import fastClick from 'fastclick'
fastClick.attach(document.body)
const app = createApp(App) // 创建实例
app.use(eventBus)
app.use(ElementPlus)
app.use(ActionBarButton)
    .use(Toast)
    .use(NumberKeyboard)
    .use(Rate)
    .use(DatetimePicker)
    .use(Uploader)
    .use(Area)
    .use(Cascader)
    .use(Picker)
    .use(Search)
    .use(ActionBarIcon)
    .use(ActionBar)
    .use(Divider)
    .use(Popup)
    .use(Overlay)
    .use(Loading)
    .use(Dialog)
    .use(ContactCard)
    .use(Form)
    .use(AddressEdit)
    .use(AddressList)
    .use(Field)
    .use(TreeSelect)
    .use(CellGroup)
    .use(Cell)
    .use(SwipeCell)
    .use(Icon)
    .use(Stepper)
    .use(Card)
    .use(Button)
    .use(Swipe)
    .use(SwipeItem)
    .use(PullRefresh)
    .use(List)
    .use(Tab)
    .use(Tabs)
    .use(SubmitBar)
    .use(Checkbox)
    .use(CheckboxGroup)
    .use(Radio)
    .use(DropdownMenu)
    .use(RadioGroup)
    .use(Empty)
    .use(DropdownItem)
    .use(Collapse)
    .use(CollapseItem).use(Switch)
app.use(router)
app.use(store)
app.mount('#app')
