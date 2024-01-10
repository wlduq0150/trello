import { LexoRank } from "lexorank";
import { Card } from "src/entity/card.entity";
import { Columns } from "src/entity/column.entity";

export function getMaxLexoFromColumn(cards: Card[] | Columns[]) {
    let maxLexo = LexoRank.min();

    cards.map((card) => {
        const lexo = LexoRank.parse(card.lexo);
        const result = lexo.compareTo(maxLexo);

        if (result > 0) maxLexo = lexo;
    });

    return maxLexo;
}
