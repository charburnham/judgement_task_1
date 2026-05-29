library(tidyverse)
library(readr)
library(purrr)
library(lme4)
library(lmerTest)

# Paper:
# Lev-Ari, S., & Keysar, B. (2010).
# Why don't we believe non-native speakers? The influence of accent on credibility.
#
# Closest replication possible with this dataset:
# - outcome: participant_truth_rating_cm
# - random intercepts: participant_id and fact_id
# - fixed effects: truth_value and accent_group
# - model comparison: base model vs. model adding accent_group
#
# Limitation:
# The original paper controlled for a Knowledge variable
# (Not known / Known-False / Known-True).
# This dataset does not include that variable, so we use truth_value instead.

# Load all participant files
files <- list.files("data", pattern = "\\.csv$", full.names = TRUE)

dat <- files %>%
  map_dfr(~ read_csv(.x, show_col_types = FALSE))

# Keep only the main truth-judgment trials
main_dat <- dat %>%
  filter(
    trial_name == "truth_judgment",
    stimulus_set == "main"
  ) %>%
  mutate(
    participant_id = factor(participant_id),
    fact_id = factor(fact_id),
    speaker_id = factor(speaker_id),
    accent_group = factor(accent_group),
    truth_value = factor(toupper(truth_value), levels = c("FALSE", "TRUE")),
    participant_truth_rating_cm = as.numeric(participant_truth_rating_cm),
    rt = as.numeric(rt)
  )

main_dat$accent_group <- relevel(main_dat$accent_group, ref = "native")

cat("Observations:", nrow(main_dat), "\n")
cat("Participants:", n_distinct(main_dat$participant_id), "\n")
cat("Items:", n_distinct(main_dat$fact_id), "\n\n")

# Descriptive statistics by accent group
accent_summary <- main_dat %>%
  group_by(accent_group) %>%
  summarise(
    mean_truth = mean(participant_truth_rating_cm, na.rm = TRUE),
    sd_truth = sd(participant_truth_rating_cm, na.rm = TRUE),
    se_truth = sd_truth / sqrt(n()),
    n = n(),
    .groups = "drop"
  )

print(accent_summary)

truth_by_accent_summary <- main_dat %>%
  group_by(accent_group, truth_value) %>%
  summarise(
    mean_truth = mean(participant_truth_rating_cm, na.rm = TRUE),
    sd_truth = sd(participant_truth_rating_cm, na.rm = TRUE),
    se_truth = sd_truth / sqrt(n()),
    n = n(),
    .groups = "drop"
  )

print(truth_by_accent_summary)

# Speaker-level descriptive statistics
speaker_summary <- main_dat %>%
  group_by(speaker_label, accent_group) %>%
  summarise(
    mean_truth = mean(participant_truth_rating_cm, na.rm = TRUE),
    sd_truth = sd(participant_truth_rating_cm, na.rm = TRUE),
    n = n(),
    .groups = "drop"
  )

print(speaker_summary)

# Sentence-level descriptive statistics
sentence_summary <- main_dat %>%
  group_by(fact_id, statement_text, truth_value) %>%
  summarise(
    mean_truth = mean(participant_truth_rating_cm, na.rm = TRUE),
    sd_truth = sd(participant_truth_rating_cm, na.rm = TRUE),
    n = n(),
    .groups = "drop"
  ) %>%
  arrange(fact_id, truth_value)

print(sentence_summary)

sentence_by_accent_summary <- main_dat %>%
  group_by(fact_id, statement_text, truth_value, accent_group) %>%
  summarise(
    mean_truth = mean(participant_truth_rating_cm, na.rm = TRUE),
    sd_truth = sd(participant_truth_rating_cm, na.rm = TRUE),
    n = n(),
    .groups = "drop"
  ) %>%
  arrange(fact_id, truth_value, accent_group)

print(sentence_by_accent_summary)

write_csv(accent_summary, "accent_truth_summary.csv")
write_csv(truth_by_accent_summary, "truth_by_accent_summary.csv")
write_csv(sentence_summary, "sentence_truth_summary.csv")
write_csv(sentence_by_accent_summary, "sentence_truth_by_accent_summary.csv")

# Figure similar to the paper's accent-by-truth plot
ggplot(accent_summary, aes(x = accent_group, y = mean_truth, fill = accent_group)) +
  geom_col(width = 0.6, show.legend = FALSE) +
  geom_errorbar(
    aes(
      ymin = mean_truth - se_truth,
      ymax = mean_truth + se_truth
    ),
    width = 0.15
  ) +
  labs(
    title = "Truth ratings by accent group",
    x = "Accent group",
    y = "Mean truth rating (cm)"
  ) +
  theme_minimal()

# Truth ratings by accent and truth value
ggplot(truth_by_accent_summary,
       aes(x = accent_group, y = mean_truth, fill = truth_value)) +
  geom_col(position = position_dodge(width = 0.8), width = 0.7) +
  geom_errorbar(
    aes(
      ymin = mean_truth - se_truth,
      ymax = mean_truth + se_truth
    ),
    position = position_dodge(width = 0.8),
    width = 0.15
  ) +
  labs(
    title = "Truth ratings by accent group and truth value",
    x = "Accent group",
    y = "Mean truth rating (cm)",
    fill = "Truth value"
  ) +
  theme_minimal()

# Sentence-level plot
ggplot(sentence_by_accent_summary,
       aes(x = reorder(fact_id, mean_truth), y = mean_truth, fill = accent_group)) +
  geom_col(position = position_dodge(width = 0.8), width = 0.7) +
  labs(
    title = "Truth ratings by sentence and accent group",
    x = "Sentence (fact_id)",
    y = "Mean truth rating (cm)",
    fill = "Accent group"
  ) +
  theme_minimal() +
  theme(axis.text.x = element_text(angle = 90, vjust = 0.5, hjust = 1))

# mixed model
base_model <- lmer(
  participant_truth_rating_cm ~ truth_value +
    (1 | participant_id) + (1 | fact_id),
  data = main_dat,
  REML = FALSE
)

accent_model <- lmer(
  participant_truth_rating_cm ~ truth_value + accent_group +
    (1 | participant_id) + (1 | fact_id),
  data = main_dat,
  REML = FALSE
)

cat("\nModel comparison: does adding accent improve fit?\n")
print(anova(base_model, accent_model))

cat("\nAccent model summary:\n")
print(summary(accent_model))

# Optional check for interaction with truth value
interaction_model <- lmer(
  participant_truth_rating_cm ~ truth_value * accent_group +
    (1 | participant_id) + (1 | fact_id),
  data = main_dat,
  REML = FALSE
)

cat("\nModel comparison: does accent interact with truth value?\n")
print(anova(accent_model, interaction_model))

cat("\nInteraction model summary:\n")
print(summary(interaction_model))

# Reaction-time follow-up
rt_dat <- main_dat %>%
  filter(!is.na(rt), rt > 0)

rt_summary <- rt_dat %>%
  group_by(accent_group) %>%
  summarise(
    mean_rt = mean(rt, na.rm = TRUE),
    median_rt = median(rt, na.rm = TRUE),
    sd_rt = sd(rt, na.rm = TRUE),
    se_rt = sd_rt / sqrt(n()),
    mean_log_rt = mean(log(rt), na.rm = TRUE),
    n = n(),
    .groups = "drop"
  )

print(rt_summary)

rt_by_accent_truth_summary <- rt_dat %>%
  group_by(accent_group, truth_value) %>%
  summarise(
    mean_rt = mean(rt, na.rm = TRUE),
    median_rt = median(rt, na.rm = TRUE),
    sd_rt = sd(rt, na.rm = TRUE),
    se_rt = sd_rt / sqrt(n()),
    mean_log_rt = mean(log(rt), na.rm = TRUE),
    n = n(),
    .groups = "drop"
  )

print(rt_by_accent_truth_summary)

write_csv(rt_summary, "rt_summary.csv")
write_csv(rt_by_accent_truth_summary, "rt_by_accent_truth_summary.csv")

# Reaction-time plots
ggplot(rt_dat, aes(x = accent_group, y = rt, fill = accent_group)) +
  geom_boxplot(show.legend = FALSE) +
  labs(
    title = "Reaction times by accent group",
    x = "Accent group",
    y = "Reaction time (ms)"
  ) +
  theme_minimal()

ggplot(rt_dat, aes(x = log(rt), fill = accent_group)) +
  geom_density(alpha = 0.4) +
  labs(
    title = "Log reaction time by accent group",
    x = "Log reaction time",
    y = "Density",
    fill = "Accent group"
  ) +
  theme_minimal()

rt_model <- lmer(
  log(rt) ~ truth_value + accent_group +
    (1 | participant_id) + (1 | fact_id),
  data = rt_dat,
  REML = FALSE
)

cat("\nReaction-time model summary:\n")
print(summary(rt_model))
