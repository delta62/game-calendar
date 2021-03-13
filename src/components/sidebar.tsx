import { Tab, Tabs } from 'tabs'

import GameList from '@containers/game-list'

import './sidebar.scss'

let Sidebar = () => (
  <Tabs>
    <Tab id="todo">
      <GameList />
    </Tab>
    <Tab id="completed">

    </Tab>
  </Tabs>
)

export default Sidebar
