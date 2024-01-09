import { LexoRank } from "lexorank";
import { Card } from "src/entity/card.entity";

export function getMaxLexoFromColumn(cards: Card[]) {
    let maxLexo = LexoRank.min();

    cards.map((card) => {
        const lexo = LexoRank.parse(card.lexo);
        const result = lexo.compareTo(maxLexo);

        if (result > 0) maxLexo = lexo;
    });

    return maxLexo;
}
