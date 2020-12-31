import { RenderableProps } from 'preact'
import GameListItem from '../containers/game-list-item'
import './game-list.scss'

export interface Props {
  games: number[]
}

let GameList = ({ games }: RenderableProps<Props>) => (
  <div class="game-list">
    <ol>
      {games.map(id => <GameListItem id={id} />)}
    </ol>
  </div>
)

export default GameList
