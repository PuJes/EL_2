#!/usr/bin/env python3
"""
Script to convert remaining culture articles to bilingual format.
This script processes articles 4-10 that still need Chinese-English conversion.

Run with: python3 convert_remaining_articles.py
"""

import re
import json
from pathlib import Path

# Configuration
FILE_PATH = Path(__file__).parent / 'src/lib/data/culture-articles.ts'

# Article translations mapping - you'll need to translate the content for each article
ARTICLES_TO_PROCESS = [
    {
        'id': 'korean-hanbok-tradition',
        'title_en': 'Korean Hanbok: The Fusion of Tradition and Modernity',
        'summary_en': 'Explore the historical evolution of Korean traditional clothing Hanbok and understand how this cultural symbol is revitalized in modern society.',
        'toc': [
            {'id': 'intro', 'title_en': 'Introduction to Hanbok'},
            {'id': 'history', 'title_en': 'Historical Development of Hanbok'},
            {'id': 'structure', 'title_en': 'Structure and Symbolism', 'children': [
                {'id': 'colors', 'title_en': 'Color Philosophy'},
                {'id': 'styles', 'title_en': 'Styles for Different Occasions'}
            ]},
            {'id': 'modern', 'title_en': 'Modern Hanbok Renaissance'},
            {'id': 'cultural', 'title_en': 'Cultural Significance'}
        ],
        'metaDescription_en': 'Discover the beauty and cultural significance of Korean Hanbok, from its historical roots to modern revival.',
        'keywords_en': ['Korean Hanbok', 'Korean Culture', 'Traditional Clothing', 'Korean Fashion', 'Cultural Heritage']
    },
    # Add similar structures for the remaining 6 articles...
]

def convert_field_to_bilingual(old_value, new_en_value, field_type='text'):
    """
    Convert a single-language field to bilingual format.

    Args:
        old_value: The Chinese value
        new_en_value: The English value
        field_type: 'text' for string, 'array' for arrays
    """
    if field_type == 'text':
        return {
            'zh': old_value,
            'en': new_en_value
        }
    elif field_type == 'array':
        return {
            'zh': old_value,
            'en': new_en_value
        }

def process_article(file_content, article_config):
    """
    Process a single article to convert it to bilingual format.

    This function needs to:
    1. Find the article by ID
    2. Convert title, summary, tableOfContents, content, author, metaDescription, keywords
    3. Replace in the file content
    """
    article_id = article_config['id']
    print(f"Processing article: {article_id}")

    # Pattern to match the article
    # This is a simplified approach - you'll need to customize based on actual content
    pattern = rf"(id: '{article_id}',.*?)(title: )'([^']+)',"

    # Example replacement for title
    match = re.search(pattern, file_content, re.DOTALL)
    if match:
        old_title = match.group(3)
        new_title = f"""title: {{
      zh: '{old_title}',
      en: '{article_config['title_en']}'
    }},"""
        file_content = file_content.replace(
            f"title: '{old_title}',",
            new_title
        )

    # Similar logic for other fields...
    # NOTE: This is a template - you'll need to implement full conversion logic

    return file_content

def main():
    """Main execution function"""
    print("Starting bilingual conversion for remaining articles...")

    # Read the file
    with open(FILE_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    # Process each article
    for article in ARTICLES_TO_PROCESS:
        content = process_article(content, article)

    # Write back
    with open(FILE_PATH, 'w', encoding='utf-8') as f:
        f.write(content)

    print("Conversion complete!")

if __name__ == '__main__':
    main()
