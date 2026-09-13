from collections.abc import Sequence

class EmbeddingModel:
    def __init__(self, model_name: str) -> None:
        from fastembed import TextEmbedding
        
        self.model_name = model_name
        self._model = TextEmbedding(model_name)

    def encode(self, texts: Sequence[str]) -> list[list[float]]:
        # fastembed yields numpy arrays, which we convert to standard lists
        vectors = list(self._model.embed(list(texts)))
        return [vector.tolist() for vector in vectors]