import os

files_to_delete = [
    r"c:\Users\super\OneDrive\Documentos\Site teste\squads\tech-news-writer\agents\caio-concorrencia.agent.md",
    r"c:\Users\super\OneDrive\Documentos\Site teste\squads\tech-news-writer\scripts\publish_final_fix_news.js",
    r"c:\Users\super\OneDrive\Documentos\Site teste\squads\tech-news-writer\scripts\publish_modern_news.js",
    r"c:\Users\super\OneDrive\Documentos\Site teste\squads\tech-news-writer\scripts\publish_real_news.js",
    r"c:\Users\super\OneDrive\Documentos\Site teste\squads\tech-news-writer\scripts\publish_test_v3.js",
    r"c:\Users\super\OneDrive\Documentos\Site teste\squads\tech-news-writer\scripts\publish_third_news.js",
    r"c:\Users\super\OneDrive\Documentos\Site teste\squads\tech-news-writer\scripts\publish_ultimate_fix_news.js",
    r"c:\Users\super\OneDrive\Documentos\Site teste\FINALIZE_KRONOS.bat",
    r"c:\Users\super\OneDrive\Documentos\Site teste\KRONOS_INSTRUCTIONS.md"
]

for file_path in files_to_delete:
    try:
        if os.path.exists(file_path):
            os.remove(file_path)
            print(f"DELETADO: {file_path}")
        else:
            print(f"NAO ENCONTRADO (IGNORADO): {file_path}")
    except Exception as e:
        print(f"ERRO ao deletar {file_path}: {e}")
