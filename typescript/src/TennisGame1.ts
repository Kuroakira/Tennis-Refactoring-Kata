import { TennisGame } from './TennisGame';
interface GameState {
  // ポイントを取ったら、次の「新しい状態」を返す（自分自身は書き換えない）
  player1Scored(): GameState;
  player2Scored(): GameState;

  // その状態のスコア文字列を返す
  getScore(): string;
}

class LoveAll implements GameState {
  player1Scored(): GameState {
    return new FifteenLove();
  }
  player2Scored(): GameState {
    return new LoveFifteen();
  }
  getScore(): string {
    return 'Love-All';
  }
}

class LoveFifteen implements GameState {
  player1Scored(): GameState {
    return new FifteenAll();
  }
  player2Scored(): GameState {
    return new LoveThirty();
  }
  getScore(): string {
    return 'Love-Fifteen';
  }
}

class FifteenLove implements GameState {
  player1Scored(): GameState {
    return new ThirtyLove();
  }
  player2Scored(): GameState {
    return new FifteenAll();
  }
  getScore(): string {
    return 'Fifteen-Love';
  }
}

class FifteenAll implements GameState {
  player1Scored(): GameState {
    return new ThirtyFifteen();
  }
  player2Scored(): GameState {
    return new FifteenThirty();
  }
  getScore(): string {
    return 'Fifteen-All';
  }
}

class ThirtyFifteen implements GameState {
  player1Scored(): GameState {
    return new FortyFifteen();
  }
  player2Scored(): GameState {
    return new ThirtyAll();
  }
  getScore(): string {
    return 'Thirty-Fifteen';
  }
}

class ThirtyAll implements GameState {
  player1Scored(): GameState {
    return new FortyThirty();
  }
  player2Scored(): GameState {
    return new ThirtyForty();
  }
  getScore(): string {
    return 'Thirty-All';
  }
}
class FortyThirty implements GameState {
  player1Scored(): GameState {
    return new Player1Win();
  }
  player2Scored(): GameState {
    return new Deuce();
  }
  getScore(): string {
    return 'Forty-Thirty';
  }
}

class Player1Win implements GameState {
  player1Scored(): GameState {
    return new GameSet();
  }
  player2Scored(): GameState {
    return new GameSet();
  }
  getScore(): string {
    return 'Win for player1';
  }
}

class GameSet implements GameState {
  player1Scored(): GameState {
    return new GameSet();
  }
  player2Scored(): GameState {
    return new GameSet();
  }
  getScore(): string {
    return 'Game Set';
  }
}

class ThirtyForty implements GameState {
  player1Scored(): GameState {
    return new Deuce();
  }
  player2Scored(): GameState {
    return new Player2Win();
  }
  getScore(): string {
    return 'Thirty-Forty';
  }
}

class Deuce implements GameState {
  player1Scored(): GameState {
    return new AdvantagePlayer1();
  }
  player2Scored(): GameState {
    return new AdvantagePlayer2();
  }
  getScore(): string {
    return 'Deuce';
  }
}
class AdvantagePlayer1 implements GameState {
  player1Scored(): GameState {
    return new Player1Win();
  }
  player2Scored(): GameState {
    return new Deuce();
  }
  getScore(): string {
    return 'Advantage player1';
  }
}

class AdvantagePlayer2 implements GameState {
  player1Scored(): GameState {
    return new Deuce();
  }
  player2Scored(): GameState {
    return new Player2Win();
  }
  getScore(): string {
    return 'Advantage player2';
  }
}
class FortyFifteen implements GameState {
  player1Scored(): GameState {
    return new Player1Win();
  }
  player2Scored(): GameState {
    return new FortyThirty();
  }
  getScore(): string {
    return 'Forty-Fifteen';
  }
}

class FifteenThirty implements GameState {
  player1Scored(): GameState {
    return new ThirtyAll();
  }
  player2Scored(): GameState {
    return new FifteenForty();
  }
  getScore(): string {
    return 'Fifteen-Thirty';
  }
}

class FifteenForty implements GameState {
  player1Scored(): GameState {
    return new ThirtyForty();
  }
  player2Scored(): GameState {
    return new Player2Win();
  }
  getScore(): string {
    return 'Fifteen-Forty';
  }
}

class Player2Win implements GameState {
  player1Scored(): GameState {
    return new GameSet();
  }
  player2Scored(): GameState {
    return new GameSet();
  }
  getScore(): string {
    return 'Win for player2';
  }
}
class ThirtyLove implements GameState {
  player1Scored(): GameState {
    return new FortyLove();
  }
  player2Scored(): GameState {
    return new ThirtyFifteen();
  }
  getScore(): string {
    return 'Thirty-Love';
  }
}

class FortyLove implements GameState {
  player1Scored(): GameState {
    return new Player1Win();
  }
  player2Scored(): GameState {
    return new FortyFifteen();
  }
  getScore(): string {
    return 'Forty-Love';
  }
}
class LoveThirty implements GameState {
  player1Scored(): GameState {
    return new FifteenThirty();
  }
  player2Scored(): GameState {
    return new LoveForty();
  }
  getScore(): string {
    return 'Love-Thirty';
  }
}

class LoveForty implements GameState {
  player1Scored(): GameState {
    return new FifteenForty();
  }
  player2Scored(): GameState {
    return new Player2Win();
  }
  getScore(): string {
    return 'Love-Forty';
  }
}

export class TennisGame1 implements TennisGame {
  private state: GameState;
  private player1Name: string;
  private player2Name: string;

  constructor(player1Name: string, player2Name: string) {
    this.player1Name = player1Name;
    this.player2Name = player2Name;
    this.state = new LoveAll();
  }

  wonPoint(playerName: string): void {
    if (playerName === this.player1Name) {
      this.state = this.state.player1Scored();
    } else {
      this.state = this.state.player2Scored();
    }
  }

  getScore(): string {
    return this.state.getScore();
  }
}
