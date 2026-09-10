# Shock-Aware Adaptive Drift Detection for Financial Regime Shifts

## Overview

A reproducible cross-asset benchmark for detecting volatility regime shifts in financial time series using statistical change-point detection and online streaming algorithms.

The project investigates how different drift detection techniques behave when applied to noisy financial markets, with particular emphasis on the trade-off between detection speed and false alarms. A lightweight adaptive framework was developed to dynamically switch between aggressive and conservative detectors based on real-time market volatility and shock conditions.

## Problem

Financial markets frequently undergo abrupt changes in volatility caused by events such as market crashes, economic shocks, and periods of heightened uncertainty.

Traditional change-point detection methods can identify structural changes effectively in historical data, but many of them operate offline and cannot directly support continuously arriving data.

Online detectors such as CUSUM, Page-Hinkley, and ADWIN can operate incrementally, but they exhibit different trade-offs between:

- Detection speed
- False alarm rate
- Noise sensitivity
- Computational efficiency

The project therefore focused on evaluating these approaches systematically across multiple financial markets and investigating whether an adaptive combination could provide a more stable detection mechanism.

## Objective

The primary objectives were to:

- Benchmark classical and streaming drift detection algorithms on real financial time-series data.
- Evaluate detection latency and false alarm behavior across different asset classes.
- Develop an interpretable adaptive mechanism for switching between detectors.
- Evaluate whether detected regime changes could improve downstream volatility forecasting.
- Validate the results using synthetic experiments and statistical significance testing.
- Maintain a CPU-efficient and reproducible evaluation pipeline.

## Dataset

The benchmark was conducted across **22 financial assets** covering:

- Equity indices
- Individual equities
- Commodities
- Foreign exchange
- Cryptocurrencies

The historical data spans approximately **2001–2024**, allowing the evaluation to cover multiple market conditions and major historical volatility events.

The dataset includes instruments such as:

- S&P 500
- NASDAQ
- Dow Jones
- Russell 2000
- Apple
- Microsoft
- NVIDIA
- Tesla
- Amazon
- Meta
- Alphabet
- JPMorgan Chase
- Goldman Sachs
- Bank of America
- ExxonMobil
- Chevron
- Gold
- Crude Oil
- EUR/USD
- USD/JPY
- Bitcoin
- Ethereum

## Approach

The pipeline converts historical price data into standardized financial signals before applying the drift detectors.

### Feature Construction

Daily log returns were calculated from historical prices and transformed using rolling normalization.

Two primary signals were used:

1. **Standardized log-return shock**
   - Captures instantaneous market movements.
   - Used to identify unusually large price shocks.

2. **Rolling volatility Z-score**
   - Captures changes in the local volatility regime.
   - Helps distinguish isolated shocks from persistent high-volatility periods.

### Drift Detection Algorithms

The project benchmarked:

- **CUSUM**
- **Page-Hinkley**
- **ADWIN**
- **PELT**

CUSUM, Page-Hinkley, and ADWIN were evaluated as online/streaming detectors, while PELT was used as an offline change-point reference.

## Adaptive Hybrid Framework

A **Volatility-Aware Adaptive Hybrid** detector was developed to combine the strengths of aggressive and conservative detection strategies.

The framework continuously evaluates:

- Instantaneous shock magnitude
- Current volatility regime

Based on these signals, it dynamically routes observations between:

### CUSUM

Used when rapid detection is preferred, particularly during strong instantaneous shocks or relatively calm volatility conditions.

### Page-Hinkley

Used during high-volatility but non-directional periods where suppressing noise and false alarms is more important than reacting to every fluctuation.

This creates an interpretable online state-based routing mechanism rather than relying on a single static detector.

## Evaluation

The framework was evaluated using several complementary metrics.

### Detection Delay

Measures how quickly a detector responds after the onset of a defined structural event.

### False Alarm Rate

Measures the frequency of alarms occurring outside the evaluated crisis windows.

### Forecasting Improvement

Detector alarms were additionally used to dynamically adjust the historical memory available to a downstream realized-volatility forecasting model.

This allowed the project to evaluate whether better regime detection translated into measurable forecasting improvements rather than treating detection performance as an isolated metric.

## Experimental Validation

The evaluation included:

- Multi-asset benchmarking across 22 assets
- Hyperparameter grid searches
- Canonical global-parameter evaluation
- 50-seed Monte Carlo synthetic experiments
- Temporal stability analysis across different market periods
- Crisis-specific case studies
- Detector agreement analysis
- Downstream volatility forecasting
- Paired Wilcoxon signed-rank testing
- Benjamini-Hochberg False Discovery Rate correction

## Key Results

The adaptive framework demonstrated a measurable trade-off between detection speed and stability.

### Detection

The aggressively tuned CUSUM baseline achieved very low detection latency but produced substantially more false alarms.

The adaptive framework intentionally accepted additional detection latency in exchange for improved stability.

### False Alarm Reduction

Under the canonical global parameter configuration, the Adaptive Hybrid achieved a global false alarm rate of approximately:

**2.91%**

compared with approximately:

**7.86%**

for the evaluated CUSUM baseline.

### Volatility Forecasting

Using detected regime changes to dynamically reset historical memory reduced realized-volatility forecasting RMSE from:

**0.010763 → 0.009979**

representing an approximately:

**8.29% relative improvement**

across the evaluated asset universe.

### Statistical Validation

The primary findings were evaluated using paired statistical tests and multiple-testing correction.

The corrected results included:

- Detection delay: **adjusted p = 0.0044**
- Forecasting improvement: **adjusted p = 0.0230**

Both results remained statistically significant at the 0.05 level.

### Computational Efficiency

The complete streaming pipeline required approximately:

**25.64 ms per asset**

on the evaluation hardware, demonstrating that the approach can operate with relatively low computational overhead.

## My Contribution

I worked on the design and implementation of the financial regime-shift detection and benchmarking pipeline, including:

- Financial time-series preprocessing
- Feature construction and normalization
- Implementation and evaluation of streaming drift detectors
- Adaptive detector-routing logic
- Experimental benchmarking
- Hyperparameter evaluation
- Synthetic Monte Carlo validation
- Statistical significance analysis
- Forecasting-based evaluation
- Cross-asset performance analysis
- Reproducibility of the experimental pipeline

The project involved combining concepts from **time-series analysis, streaming algorithms, statistical testing, machine learning, and financial data science**.

## Technologies

### Programming

- Python

### Data & Scientific Computing

- NumPy
- Pandas
- SciPy
- Matplotlib

### Machine Learning / Streaming

- River
- Scikit-learn

### Change-Point Detection

- Ruptures
- CUSUM
- Page-Hinkley
- ADWIN
- PELT

### Data Source

- Yahoo Finance API

### Statistical Analysis

- Wilcoxon signed-rank test
- Benjamini-Hochberg FDR correction
- Monte Carlo simulation

## Technical Highlights

- Online/streaming processing without look-ahead during detector evaluation
- Cross-asset benchmarking across 22 financial instruments
- Adaptive routing between statistical detectors
- Rolling volatility and shock normalization
- Synthetic and historical validation
- Statistical significance testing with multiple-testing correction
- CPU-efficient streaming architecture
- Reproducible experimental pipeline

## Outcome

The project demonstrates that combining complementary statistical detectors can provide a more stable regime-detection mechanism than relying on a single aggressively tuned detector.

Rather than optimizing solely for the fastest possible alarm, the framework evaluates detection quality in terms of both **responsiveness and operational stability**, and further demonstrates how detected regime changes can be used to improve downstream volatility forecasting.

## Research Output

The work was developed as a research-oriented empirical benchmark and prepared as a manuscript covering:

- Related work
- Dataset and feature construction
- Detection methodology
- Experimental protocol
- Statistical validation
- Results
- Limitations
- Future research directions

## Future Extensions

Potential extensions identified through the project include:

- Multivariate cross-asset drift detection
- Cross-market correlation signals
- Dynamic threshold learning
- Meta-learning based detector selection
- Better handling of highly volatile cryptocurrency markets
- Bayesian and additional statistical change-point methods
- Systemic market indicators such as VIX-based signals