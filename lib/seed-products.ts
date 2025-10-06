import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

// Interface pour les produits
interface Product {
  slug: string
  title: string
  brand: string
  description: string
  price_mad: number
  images: string[]
  type: string
  is_published: boolean
  category_slug?: string
}

async function seedProducts() {
  console.log('🚀 Début de l\'import des produits...')
  
  // Vérifier la clé de service
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!serviceRoleKey) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY manquante dans .env')
    process.exit(1)
  }

  // Créer le client Supabase avec la clé de service
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    serviceRoleKey
  )

  try {
    // Lire le fichier JSON
    const filePath = join(process.cwd(), 'lib', 'products-data.json')
    const fileContent = readFileSync(filePath, 'utf-8')
    const products: Product[] = JSON.parse(fileContent)

    console.log(`📦 ${products.length} produits trouvés dans le fichier`)

    let created = 0
    let updated = 0
    let errors = 0

    // Traiter chaque produit
    for (const product of products) {
      try {
        // Vérifier si le produit existe déjà
        const { data: existing } = await supabase
          .from('articles')
          .select('id')
          .eq('slug', product.slug)
          .single()

        if (existing) {
          // Mettre à jour le produit existant
          const { error } = await supabase
            .from('articles')
            .update({
              title: product.title,
              brand: product.brand,
              description: product.description,
              price_mad: product.price_mad,
              images: product.images,
              type: product.type,
              is_published: product.is_published,
              category_slug: product.category_slug,
              updated_at: new Date().toISOString()
            })
            .eq('slug', product.slug)

          if (error) {
            console.error(`❌ Erreur mise à jour ${product.slug}:`, error.message)
            errors++
          } else {
            console.log(`✅ Mis à jour: ${product.title}`)
            updated++
          }
        } else {
          // Créer un nouveau produit
          const { error } = await supabase
            .from('articles')
            .insert({
              slug: product.slug,
              title: product.title,
              brand: product.brand,
              description: product.description,
              price_mad: product.price_mad,
              images: product.images,
              type: product.type,
              is_published: product.is_published,
              category_slug: product.category_slug,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })

          if (error) {
            console.error(`❌ Erreur création ${product.slug}:`, error.message)
            errors++
          } else {
            console.log(`🆕 Créé: ${product.title}`)
            created++
          }
        }
      } catch (err) {
        console.error(`❌ Erreur traitement ${product.slug}:`, err)
        errors++
      }
    }

    // Résumé final
    console.log('\n📊 RÉSUMÉ DE L\'IMPORT:')
    console.log(`✅ Produits créés: ${created}`)
    console.log(`🔄 Produits mis à jour: ${updated}`)
    console.log(`❌ Erreurs: ${errors}`)
    console.log(`📦 Total traité: ${created + updated + errors}/${products.length}`)

    if (errors === 0) {
      console.log('\n🎉 Import terminé avec succès!')
    } else {
      console.log('\n⚠️  Import terminé avec des erreurs')
      process.exit(1)
    }

  } catch (error) {
    console.error('❌ Erreur fatale:', error)
    process.exit(1)
  }
}

// Exécuter le script
seedProducts()