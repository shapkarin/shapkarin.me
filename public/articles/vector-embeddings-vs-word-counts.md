---
title: "Vector Embeddings vs Word Counts: K-Means Uses Both"
description: "K-means clustering doesn't compete with vector embeddings — it consumes them. The real tradeoff is embeddings vs word counts. A 7-year-old experiment shows why."
keywords:
  - "vector embeddings vs word counts"
  - "k-means clustering"
  - "TF-IDF"
  - "text clustering"
  - "bag of words"
  - "unsupervised machine learning"
  - "latent semantic analysis"
order: 1
---

# Vector Embeddings vs Word Counts: K-Means Uses Both

There's a question that shows up constantly in ML discussions and shouldn't: *"Should I use k-means or embeddings?"*

It's a category error. K-means clustering and vector embeddings sit at different layers of the same pipeline. Embeddings produce vectors; k-means consumes vectors. Asking which to pick is like asking whether to use a camera or a JPEG.

The choice that *is* real — with genuine tradeoffs, cost implications, and an answer that depends on your data — is **vector embeddings vs word counts**. Both produce the numeric representation your clustering algorithm needs, and they produce very different geometry.

Seven years ago I picked word counts for a pet project, [shapkarin/movies](https://github.com/shapkarin/movies), which clustered movies by their plot summaries. It committed a result of 371 clusters. This article uses that experiment to show where the real decision lives — and, because I re-ran the analysis before publishing, to correct the explanation I originally gave for what went wrong.

---

## The Two Layers of Any Clustering Pipeline

Every text clustering system has the same shape, and conflating the layers is what causes the confusion:

| Layer | Question it answers | Options |
|---|---|---|
| **1. Representation** | How do I turn text into numbers? | Word counts (bag-of-words, TF-IDF, BM25), vector embeddings, topic models |
| **2. Algorithm** | How do I group those numbers? | K-means, MeanShift, DBSCAN, HDBSCAN, agglomerative |

The layers are independent. You can run k-means on TF-IDF vectors or on embeddings; you can run HDBSCAN on either. Swapping one doesn't force a change in the other.

```python
# Layer 1 — pick ONE of these
X = TfidfVectorizer().fit_transform(docs)                  # word counts
X = SentenceTransformer("all-MiniLM-L6-v2").encode(docs)   # embeddings

# Layer 2 — unchanged either way
labels = KMeans(n_clusters=12, n_init=10).fit_predict(X)
```

That second line is identical in both worlds.

K-means makes the point historically too. Hugo Steinhaus proposed the multidimensional version in 1956; Stuart Lloyd wrote the standard algorithm at Bell Labs in 1957 (unpublished until 1982); Edward Forgy published essentially the same method in 1965; James MacQueen coined the name "k-means" in 1967. **Nothing about Layer 2 changed when embeddings arrived. Layer 1 changed completely.**

[EXTERNAL LINK: scikit-learn's clustering overview, comparing algorithm families, scalability, and use cases — https://scikit-learn.org/stable/modules/clustering.html]

---

## The Real Competition: Word Counts vs Vector Embeddings

### How word counts represent meaning

Bag-of-words and its weighted cousin TF-IDF treat a document as an unordered multiset of tokens. TF-IDF adds one refinement: a term scores high if it's frequent in *this* document and rare across the corpus, so "the" collapses toward zero while "heist" stands out.

That was the entire semantic model in my movies experiment:

```python
from sklearn.feature_extraction.text import TfidfVectorizer

vectorizer = TfidfVectorizer()
x = vectorizer.fit_transform(plots_array)
feature_names = vectorizer.get_feature_names()
```

Two defaults in that snippet matter later, and I didn't think about either at the time:

- `TfidfVectorizer` uses `norm="l2"`, so **every output row is a unit vector**.
- Features are indexed in **alphabetical order** of the vocabulary.

### How embeddings represent meaning

A sentence-embedding model maps text into a dense vector — roughly 384 to 4,096 dimensions in current models — where geometric proximity approximates semantic similarity. The model learned that mapping from a very large corpus, so it places "detective" near "investigator" without anyone writing a synonym list.

```python
from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")
X = model.encode(docs, normalize_embeddings=True)   # (n_docs, 384)
```

One caveat that bites on exactly this use case: `all-MiniLM-L6-v2` truncates input beyond **256 word pieces**. Full movie plot summaries routinely exceed that, so half your document silently disappears. For longer text, use a long-context model — `nomic-embed-text` handles 8,192 tokens — or chunk and pool.

### Side by side

| | Word counts (TF-IDF) | Vector embeddings |
|---|---|---|
| Dimensions | 10,000–100,000+, sparse | 384–4,096, dense |
| Synonyms | Invisible | Captured |
| Word order / negation | Ignored | Captured |
| Document length limit | None | Model's context window |
| Cost | Milliseconds, CPU-only | Seconds–minutes, GPU optional |
| Interpretable | Yes — every column is a word | No — dimensions are opaque |
| Out-of-vocabulary words | Dropped entirely | Handled via subword tokens |
| Multilingual | No | With the right model, yes |

This is a genuine tradeoff with two defensible sides. "K-means vs embeddings" is not.

---

## What Actually Broke in the 7-Year-Old Experiment

Here I have to correct myself. The easy story is "high-dimensional sparse vectors suffer the curse of dimensionality." I believed that, and it's the explanation you'll see repeated everywhere. **It's not what happened, and for text it's largely a myth.**

Beyer et al.'s 1999 paper *When Is "Nearest Neighbor" Meaningful?* is the standard citation for distance concentration — but the same paper explicitly identifies workloads where the effect doesn't occur, and sparse text collections are a known exception. scikit-learn ships an [official example](https://scikit-learn.org/stable/auto_examples/text/plot_document_clustering.html) that clusters documents with TF-IDF and k-means precisely because it works.

I rebuilt the pipeline on a controlled synthetic corpus (900 documents, six planted topics, ~8,500-term Zipfian vocabulary) to test which layer failed. Cluster purity against the known labels, where 0.167 is chance:

| Representation | K-means purity |
|---|---|
| Full TF-IDF, L2-normalized, ~8,500 sparse dims | **0.833** |
| TF-IDF sliced to the first 1,000 features | **0.693** |
| TF-IDF → TruncatedSVD(100) → re-normalized | **0.944** |

Full high-dimensional sparse TF-IDF clusters fine. The dimensionality was never the problem.

### The actual culprit

```python
X2 = np.array(list(map(lambda item: item[0:1000], x.toarray())))
```

That line keeps the first 1,000 columns of an alphabetically-ordered vocabulary. It does two destructive things at once:

**It selects features by spelling, not by information.** Alphabetical position is uncorrelated with how discriminative a term is. In the synthetic run, that slice retained only 16% of each document's squared TF-IDF mass and 30 of 240 planted signal terms.

**It silently un-normalizes every vector.** `TfidfVectorizer` returns unit-length rows; after slicing, row norms fell to a range of **0.215–0.599** instead of a uniform 1.0. Documents whose vocabulary happened to sit late in the alphabet collapsed toward the origin.

That second effect is what makes MeanShift explode. MeanShift is a density algorithm operating on Euclidean distance, and `estimate_bandwidth` derives its scale from neighbour distances. In the synthetic run the estimated bandwidth dropped from **1.359** on full TF-IDF to **0.455** on the sliced matrix — a range comparable to the spread in row norms. The algorithm ends up partitioning documents partly by *vector length*, an artifact of the slice, rather than by topic. Hence 371 groups where a dozen or two exist.

```python
bandwidth = estimate_bandwidth(X2)   # scale inherited from corrupted geometry
ms = MeanShift(bandwidth=bandwidth)
ms.fit(X2)
```

**The crucial point for this article's thesis: swapping MeanShift for k-means would not have fixed it.** The bug was in Layer 1. The correct fix — one line — was TruncatedSVD, which is latent semantic analysis and the standard companion to TF-IDF, followed by re-normalization because SVD output isn't unit-length:

```python
from sklearn.decomposition import TruncatedSVD
from sklearn.preprocessing import Normalizer
from sklearn.pipeline import make_pipeline

lsa = make_pipeline(TruncatedSVD(n_components=100), Normalizer(copy=False))
X_reduced = lsa.fit_transform(x)     # 0.944 purity, vs 0.693 for the slice
```

The repo README says *"Work is not completed"* and *"The vocab is reduced due to lack of capacity."* Both were true. The memory pressure was real; the response to it was wrong.

The code has aged in visible ways, too: `sklearn.datasets.samples_generator` was removed in scikit-learn 0.24, and `get_feature_names()` was removed in 1.2. The project won't import on a modern install without edits.

[EXTERNAL LINK: Beyer, Goldstein, Ramakrishnan & Shaft, "When Is 'Nearest Neighbor' Meaningful?", ICDT 1999 — https://link.springer.com/chapter/10.1007/3-540-49257-7_15]

---

## When Word Counts Still Beat Embeddings

Embeddings are not a strict upgrade. Word counts remain the better Layer 1 choice when:

- **Exact terms carry the signal.** Part numbers, error codes, legal citations, log lines. Embeddings blur precisely the distinctions you care about.
- **You must explain the clusters.** TF-IDF centroids can be read directly as top-weighted words. An embedding centroid explains nothing.
- **Documents exceed the model's context window.** A 4,000-word document hits a 256- or 512-token limit; TF-IDF has no such ceiling.
- **The domain is narrow and jargon-heavy.** A general-purpose model may carry little signal for your vocabulary.
- **Scale or latency is binding.** TF-IDF over a million short documents runs on a laptop in seconds, with no model to load.

Production search systems routinely run both — BM25 for lexical recall, embeddings for semantic recall, then fusion. People paying to run two pipelines is the strongest evidence that these are genuine competitors. [INTERNAL LINK: /articles/hybrid-search-bm25-embeddings "combining BM25 and vector search"]

---

## Choosing the Algorithm — A Separate Decision

Once the representation is settled, Layer 2 is answered by the shape of your problem, not by which vectorizer you used:

| Situation | Reach for |
|---|---|
| You know `k`, or can search for it | **K-means** — fast, well understood, scales via MiniBatchKMeans |
| Cluster count unknown, noise present | **HDBSCAN** — in `sklearn.cluster` since 1.3, no extra dependency |
| You want a hierarchy to cut at any level | **Agglomerative** |
| Small data, arbitrary cluster shapes | **DBSCAN** or **MeanShift** |

MeanShift is a poor default at scale regardless of representation: scikit-learn's docs put it near O(T·n²) in higher dimensions, and note that `estimate_bandwidth` is *less* scalable than the clustering itself and becomes the bottleneck. My 2019 self reached for it to avoid choosing `k`. HDBSCAN is the better answer to that same wish today.

Two practical notes if you do run k-means on embeddings:

```python
X = model.encode(docs, normalize_embeddings=True)
```

Unit-length vectors make Euclidean distance monotonic with cosine similarity — for unit vectors, ‖a−b‖² = 2 − 2·cos(a,b). K-means minimizes Euclidean distance, so normalization is how you get it to cluster by the metric embeddings are actually trained for. Skipping this is the most common mistake in embedding-based clustering.

And pick `k` with evidence:

```python
from sklearn.metrics import silhouette_score

scores = {k: silhouette_score(X, KMeans(n_clusters=k, n_init=10).fit_predict(X))
          for k in range(5, 31)}
best_k = max(scores, key=scores.get)
```

Set `n_init` explicitly — the default changed to `"auto"` in scikit-learn 1.4, which runs fewer restarts than the old default of 10 and can quietly produce worse solutions.

[EXTERNAL LINK: Sentence-Transformers documentation, for model selection, context limits, and normalization — https://www.sbert.net/]

---

## FAQ

### Are k-means clustering and vector embeddings competing choices?

No. They operate at different layers. Embeddings are a representation — they turn text into vectors. K-means is an algorithm that groups whatever vectors it's given. The competing pair is vector embeddings vs word counts, since both are representations.

### What actually competes with vector embeddings?

Word counts: bag-of-words, TF-IDF, BM25 weighting, and hashing vectorizers. Also topic models like LDA and hand-engineered features. These are the alternative ways to turn documents into the numeric vectors that clustering, search, and classification all consume.

### Does the curse of dimensionality break TF-IDF clustering?

Usually not. Sparse text collections are a documented exception to distance concentration, and scikit-learn's own example clusters TF-IDF vectors with k-means successfully. In a controlled rerun, full sparse TF-IDF reached 0.833 cluster purity against planted labels. Reducing with TruncatedSVD improved it to 0.944, but the unreduced version was already usable.

### Why did the shapkarin/movies experiment produce 371 clusters?

A Layer 1 bug, not an algorithm failure. The code sliced the TF-IDF matrix to its first 1,000 alphabetically-ordered features, which discarded most of the discriminative terms and destroyed the L2 unit-norm that `TfidfVectorizer` produces. MeanShift's bandwidth estimate then reflected corrupted geometry and fragmented the data. Swapping in k-means would not have helped; TruncatedSVD would have.

### Should I use TF-IDF or vector embeddings for clustering short documents?

Embeddings, usually — short texts share few exact terms, so TF-IDF vectors become extremely sparse and unreliable. The exception is when the short text *is* an identifier: SKUs, error codes, command strings, where exact matching is the point.

### Do I need a GPU to generate vector embeddings?

No. Small models like `all-MiniLM-L6-v2` (about 22 million parameters, ~80 MB) run comfortably on CPU. A GPU helps at the hundreds-of-thousands scale, and hosted APIs remove the hardware question entirely at the cost of sending data to a third party.

### How many embedding dimensions do I need for clustering?

384 is a solid default. Larger models — up to 3,840 dimensions in current MTEB leaders — improve retrieval more than clustering. Many recent models are trained with Matryoshka Representation Learning, so you can truncate the vector and keep most of the quality. That's the principled version of what I did badly by slicing TF-IDF columns: MRL front-loads information into the early dimensions on purpose, whereas alphabetical vocabulary order carries no information at all.

---

## Conclusion

K-means clustering and vector embeddings were never rivals. K-means consumes vectors and is indifferent to where they came from — it works the way Lloyd described in 1957, and it will faithfully cluster whatever you hand it, well or badly.

The decision that carries real weight is **vector embeddings vs word counts**. Seven years ago in [shapkarin/movies](https://github.com/shapkarin/movies) I chose word counts, which was the reasonable call at the time — and then broke them with a one-line slice that no clustering algorithm could have recovered from.

That's the lesson worth keeping. When a clustering result looks absurd, the instinct is to try a different algorithm. Check the geometry of your vectors first: their norms, their variance, how much of each document actually survived preprocessing. The bug is usually upstream of Layer 2.